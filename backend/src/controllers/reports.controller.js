import * as reportService from "../services/reports.service.js";
import { uploadCSVReports as uploadCSVService } from '../services/csv.service.js';

const getUserId = (user) => user._id || user.id;

export async function createNewReport(req, res) {
    try {
        const report = await reportService.createReport({
            ...req.body,
            userId: getUserId(req.user),
            imagePath: req.file ? `/uploads/${req.file.filename}` : null
        });
        res.status(201).json({ message: "Report created successfully", report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllReports(req, res) {
    try {
        const reports = await reportService.getReports({
            currentUser: req.user,
            filters: req.query
        });
        res.status(200).json({ reports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getMyReports(req, res) {
    try {
        const reports = await reportService.getMyReports(getUserId(req.user));
        res.status(200).json({ reports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const handleCSVUpload = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        const result = await uploadCSVService(req, getUserId(req.user));
        res.status(200).json({ message: "CSV processed", count: result.insertedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getSingleReport(req, res) {
    try {
        const report = await reportService.getReportById(req.params.id, req.user);
        res.status(200).json({ report });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

export async function removeReport(req, res) {
    try {
        await reportService.deleteReport(req.params.id, req.user);
        res.json({ message: "Report deleted" });
    } catch (error) { res.status(500).json({ message: error.message }); }
}