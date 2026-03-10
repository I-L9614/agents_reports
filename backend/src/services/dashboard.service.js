import { getDB } from "../db/mongo.js";

export async function getDasboardState(){
    const db = getDB()
    const users = await db.collection("users").countDocuments({
        role: "agent"
    })

    const reports = await db.collection("reports").countDocuments()
 
    const byCategory = await db.collection("reports").aggregate([
        {
            $group: {
                _id: "$category",
                count: {$sum: 1}
            } 
        }
    ]).roArray()
    
    const byUrgency = await db.collection("reports").aggregate([
        {
            $group: {
                _id: "$urgency",
                count: {$count: 1}
            }
        }
    ]).toArray()

    return {
        agents: users,
        reports,
        byCategory,
        byUrgency
    }
}