import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log(`MongoDB connected to database: ${process.env.DB_NAME}`);
}

export function getDB() {
  if (!db) {
    throw new Error("Database connection not initialized");
  }

  return db;
}