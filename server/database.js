import "dotenv/config";
import process from "node:process";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export async function connectToDatabase() {
  if (!uri || uri.includes("<db_password>")) {
    throw new Error("Set a valid MONGODB_URI in the project .env file.");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db(process.env.MONGODB_DB_NAME || "portfolio");
}

export async function closeDatabaseConnection() {
  if (client) {
    const connectedClient = client;
    client = undefined;
    await connectedClient.close();
  }
}
