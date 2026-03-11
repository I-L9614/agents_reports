import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo.js";

export async function createReport({
    userId,
    category,
    urgency,
    message,
    imagePath = null,
    sourceType = "manual"
}) {
    const db = getDB()
    const reportsCollection = db.collection('reports')
    if (!category || !urgency || !message) {
        throw new Error("Missing required Field")
        }
        const validUrgency = ["low", "medium", "high"]
        const validCategory = ["intelligence", "logistics", "alert"]
    
        if (!validUrgency.includes(urgency)){
            throw new Error("Invalid urgency")
        }
    
        if (!validCategory.includes(category)) {
            throw new Error("Invalid category")
        }
    
        const report = {
            userId: new ObjectId(userId),
            category,
            urgency,
            message,
            imagePath,
            sourceType,
            createdAt: new Date()
        }
    
        const result = await reportsCollection.insertOne(report)
    
        return {
            id: result.insertedId.toString(),
            userId: report.userId.toString(),
            category: report.category,
            urgency: report.urgency,
            message: report.message,
            imagePath: report.imagePath,
            sourceType: report.sourceType,
            createdAt: report.createdAt
    }
}



export async function getReports({ currentUser, filters = {} }) {
    const db = getDB()
    const reportsCollection = db.collection("reports")

    const query = {}
    if (currentUser.role === "agent") {
        query.userId = new ObjectId(currentUser.id)
    }

    if (filters.category) {
        query.category = filters.category
    }
    if (filters.urgency) {
        query.urgency = filters.urgency
    }

    const reports = await reportsCollection.find(query).sort({ createAt: -1 }).toArray()

    return reports.map((report) => ({
        id: report._id.toString(),
        userId: report.userId.toString(),
        category: report.category,
        urgency: report.urgency,
        message: report.message,
        imagePath: report.imagePath,
        sourceType: report.sourceType,
        createdAt: report.createdAt
    }))
}

export async function getReportById(reportId, currentUser) {
    const db = getDB()
    const reportsCollection = db.collection('reports')

    const report = await reportsCollection.findOne({
        _id: new ObjectId(reportId)
    })

    if (!report) {
        throw new Error("Report not found")
    }

    if (currentUser.role === "agent" && report.userId.toString() !== currentUser.id) {
        throw new Error("Forbidden")
    }

    return {
        id: report._id.toString(),
        userId: report.userId.toString(),
        category: report.category,
        urgency: report.urgency,
        message: report.message,
        imagePath: report.imagePath,
        sourceType: report.sourceType,
        createdAt: report.createdAt
    }
}

export async function deleteReport(reportId, currentUser) {
    const db = getDB()
    const reportsCollection = db.collection("reports")

    const report = await reportsCollection.findOne({
        _id: new ObjectId(reportId)
    })

    if (!report) {
        throw new Error("Report not found")
    }

    if (
        currentUser.role === "agent" &&
        report.userId.toString() !== currentUser.id
    ) {
        throw new Error("Forbidden")
    }
    await reportsCollection.deleteOne({
        _id: new ObjectId(reportId)
    })
    return true
}

export async function getMyReports(userId) {
    try {
        const db = getDB(); 
        const reportsCollection = db.collection('reports');
        
        const reports = await reportsCollection
            .find({ userId: new ObjectId(userId) }) 
            .sort({ createdAt: -1 }) 
            .toArray();
            
        return reports.map((report) => ({
            id: report._id.toString(),
            userId: report.userId.toString(),
            category: report.category,
            urgency: report.urgency,
            message: report.message,
            imagePath: report.imagePath,
            sourceType: report.sourceType,
            createdAt: report.createdAt
        }));
    } catch (error) {
        console.error("Error in getMyReports service:", error);
        throw error;
    }
}