import bcrypt from 'bcryptjs'
import { getDB } from '../db/mongo.js'

export async function seedAdmin() {
    const db = getDB()
    const usersCollection = db.collection("users")

    const existingAdmin = await usersCollection.findOne({role: "admin"})

    if (existingAdmin) {
        console.log("admin already exists")
        return
    }

    const passwordHash = await bcrypt.hash("james bond", 10)

    await usersCollection.insertOne({
        agentCode: "WO7",
        fullName: "OO7",
        passwordHash,
        role: "admin",
        createAt: new Date()
    })
    console.log("admin created succssfully")
}