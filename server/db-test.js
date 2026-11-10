import process from "node:process";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "./database.js";

try {
  const database = await connectToDatabase();
  const result = await database.command({ ping: 1 });
  console.log("MongoDB connection successful:", result);
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exitCode = 1;
} finally {
  await closeDatabaseConnection();
}
