import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo.js";
import { urlencoded } from "express";

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
    const report = {
        userId: new ObjectId(userId),
        category,
        urgency,
        message,
        imagePath,
        sourceType,
        createAt: new Date()
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
        createAt: report.createAt
    }
}

export async function getReports({ currentUser, filters = {} }) {
    const db = getDB()
    const reportsCollection = db.collection("reports")

    const query = {}
    if (currentUser.role === "agent"){
        query.userId = new ObjectId(currentUser.id)
    }

    if (filters.category) {
        query.category = filters.category
    }
    if (filters.urgency) {
        query.urgency = filters.urgency
    }

    const reports = await reportsCollection.find(query).sort({createAt: -1}).toArray()

    return reports.map((report) => ({
        id: report._id.toString(),
        iserId: report.userId.toString(),
        category: report.category,
        urgency: report.urgency,
        message: report.message,
        imagePath: report.imagePath,
        sourceType: report.sourceType,
        createAt: report.createAt
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
        createAt: report.createAt
    }
}