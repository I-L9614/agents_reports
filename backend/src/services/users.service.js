import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo.js";
import { ObjectId } from "mongodb";

export async function createUser({ agentCode, fullName, password, role }) {
    const db = getDB();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ agentCode });

    if (existingUser) {
        throw new Error("Agent code already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
        agentCode,
        fullName,
        passwordHash,
        role,
        createdAt: new Date() 
    });
    
    return {
        id: result.insertedId.toString(),
        agentCode,
        fullName,
        role
    };
}

export async function getAllUsers() {
    const db = getDB();
    const usersCollection = db.collection('users');

    const users = await usersCollection.find({}, { projection: { passwordHash: 0 } }).toArray();
    
    return users.map((user) => ({
        id: user._id.toString(),
        agentCode: user.agentCode,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt 
    }));
}

export async function removeUser(id) {
    const db = getDB();
    const usersCollection = db.collection('users');
    
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    
    return result.deletedCount > 0;
}