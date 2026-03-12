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
    const db = getDB();
    const reportsCollection = db.collection('reports');
    
    if (!category || !urgency || !message) {
        throw new Error("Missing required fields");
    }

    const report = {
        userId: new ObjectId(userId),
        category: category.toLowerCase(),
        urgency: urgency.toLowerCase(),
        message,
        imagePath,
        sourceType,
        createdAt: new Date()
    };

    const result = await reportsCollection.insertOne(report);
    return { id: result.insertedId.toString(), ...report };
}

export async function getReports({ currentUser, filters = {} }) {
    const db = getDB();
    const query = {};

    if (currentUser.role === "agent") {
        query.userId = new ObjectId(currentUser.id || currentUser._id);
    }

    if (filters.category) query.category = filters.category;
    if (filters.urgency) query.urgency = filters.urgency;

    const reports = await db.collection("reports").find(query).sort({ createdAt: -1 }).toArray();

    return reports.map(report => ({
        id: report._id.toString(),
        ...report,
        userId: report.userId.toString()
    }));
}

export async function getMyReports(userId) {
    const db = getDB();
    const reports = await db.collection('reports')
        .find({ userId: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .toArray();

    return reports.map(report => ({
        id: report._id.toString(),
        ...report,
        userId: report.userId.toString()
    }));
}

export async function getReportById(reportId, currentUser) {
    const db = getDB();
    const report = await db.collection('reports').findOne({ _id: new ObjectId(reportId) });
    if (!report) throw new Error("Report not found");
    return report;
}

export async function deleteReport(reportId, currentUser) {
    const db = getDB();
    const report = await db.collection('reports').findOne({ _id: new ObjectId(reportId) });
    if (!report) throw new Error("Report not found");
    await db.collection('reports').deleteOne({ _id: new ObjectId(reportId) });
    return true;
}