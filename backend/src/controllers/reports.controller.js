import { createReport, getReports, getReportById, deleteReport,getMyReports as getMyReportsService } from "../services/reports.service.js";
import { ObjectId } from "mongodb";


export async function createNewReport(req, res) {
    try {
        const { category, urgency, message, sourceType } = req.body
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null
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
            imagePath,
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

        res.status(200).json({ report })
    } catch (error) {
    console.error("Error in getSingleReport:", error);
    res.status(500).json({ 
        message: "Internal server error",
        error: error.message 
    });
}

}

export async function removeReport(req,res) {
    try {
        await deleteReport(req.params.id, req.user)

        res.json({
            message: "Report deleted"
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function getMyReports(req, res) {
    try {
        const reports = await getMyReportsService(req.user.id);
        res.status(200).json({ reports });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching your reports",
            error: error.message
        });
    }
}