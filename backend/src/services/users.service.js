import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo.js";

export async function createUser({ agentCode, fullName, password, role }) {
    const db = getDB()
    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.fineOne({ agentCode })

    if (existingUser) {
        throw new Error("Agent code already exists")
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await usersCollection.insertOne({
        agentCode,
        fullName,
        passwordHash,
        role,
        createAt: new Date()
    })
    return {
        id: result.insertedId.toString(),
        agentCode,
        fullName,
        role
    }
}

export async function getAllUsers() {
    const db = getDB()
    const usersCollection = db.collection('users')

    const users = await usersCollection.find({}, { projection: { passwordHash: 0 } }).toArray()
    return users.map((user) => ({
        id: user_id.toString(),
        agentCode: user.agentCode,
        fullName: user.fullName,
        role: user.role,
        createAt: user.createAt
    }))
}