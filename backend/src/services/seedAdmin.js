import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo.js";

export async function seedAdmin() {
  const db = getDB();
  const usersCollection = db.collection("users");

  const existingAdmin = await usersCollection.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash("james bond", 10);

  await usersCollection.insertOne({
    agentCode: "WO7",
    fullName: "Main Admin",
    passwordHash,
    role: "admin",
    createdAt: new Date()
  });

  console.log("Admin created successfully");
}