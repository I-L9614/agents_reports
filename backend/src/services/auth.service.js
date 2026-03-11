import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { getDB } from "../db/mongo.js";
import { ObjectId } from "mongodb";

export async function loginUser(agentCode, password) {
    const db = getDB()
    const usersCollection  = db.collection("users")

    const user = await usersCollection.findOne({ agentCode })

    if(!user) {
        throw new Error("Invalid credentials")
    }
    console.log(user)
    const isPasswordValid = await bcrypt.compare(password.trim(), user.passwordHash)

    console.log(password)
    if (!isPasswordValid) {
        throw new Error("Invalid credentials")
    }
    const token = jwt.sign({
        id: user._id.toString(),
        agentCode: user.agentCodee,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
  return {
    token,
    user: {
        id: user._id.toString(),
        agentCode: user.agentCode,
        fullName: user.fullName,
        role: user.role,
        createAt: user.createAt
    }
  }
}

export async function getCurrentUser(userId) {
    const db = getDB()
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne(
        {_id: new ObjectId(userId)},
        {projection: {passwordHash: 0}}
    )
    if(!user){
        throw new Error("User not found")
    }

    return {
        id: user._id.toString(),
        agentCode: user.agentCode,
        fullName: user.fullName,
        role: user.role,
        createAt: user.createAt
    }
}