import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { getDB } from "../db/mongo";

export async function loginUser(agentCode, password) {
    const db = getDB()
    const usersCollection  = db.collecion("users")

    const user = await usersCollection.findOne({ agentCode })

    if(!user) {
        throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

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