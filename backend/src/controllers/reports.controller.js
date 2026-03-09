import { createReport, getReports, getReportById } from "../services/reports.service.js";

export async function createNewReport(req, res) {
    try {
        const { category, urgency, message, imagePath, sourceType } = req.Body

        if (!category || !urgency || !message) {
            return res.status(400).json({
                message: "Category, argency and message are required"
            })
        }

        const report = await createReport({
            userId: req.user.id,
            category,
            urgency,
            message,
            imagePath: imagePath || null,
            sourceType: sourceType || "manual"
        })

        res.status(201).json({
            message: "Report created successfully", report
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function getAllReports(req, res) {
    try {
        const { category, urgency } = req.query

        const reports = await getReports({
            currentUser: req.user,
            filters: { category, urgency }
        })

        res.status(200).json({ reports })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function getSingleReport(req,res) {
    try {
        const report = await getReportById(req.params.id, req.user)

        res.staus(200).json({ report })
    } catch (error) {
        const statusCode = 
        TokenExpiredError.message === "Report not fount" ? 404 : error.message === "Forbidden" ? 403 : 500
        res.status(statusCode).json({
            message: error.message
        })
    }
}