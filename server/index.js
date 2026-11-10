import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { connectToDatabase } from "./database.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const distDirectory = fileURLToPath(new URL("../dist", import.meta.url));

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.post(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again later." },
  }),
  async (request, response) => {
    const { name, email, message } = request.body ?? {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (
      !cleanName ||
      cleanName.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      cleanEmail.length > 254 ||
      !cleanMessage ||
      cleanMessage.length > 5000
    ) {
      response.status(400).json({
        error:
          "Enter a valid name, email address, and message (up to 5,000 characters).",
      });
      return;
    }

    try {
      const database = await connectToDatabase();
      await database.collection("contactMessages").insertOne({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        createdAt: new Date(),
      });

      response.status(201).json({ message: "Your message has been received." });
    } catch (error) {
      console.error("Failed to save contact message:", error.message);
      response.status(500).json({
        error: "We couldn't send your message right now. Please try again later.",
      });
    }
  },
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distDirectory));
  app.get("/{*path}", (request, response, next) => {
    if (request.path === "/api" || request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.sendFile(path.join(distDirectory, "index.html"));
  });
}

try {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Contact API listening on port ${port}.`);
  });
} catch (error) {
  console.error("Failed to start the contact API:", error.message);
  process.exitCode = 1;
}
