import fs from "fs"
import csv from "csv-parser"
import { getDB } from "../db/mongo.js"

export async function uploadCSVReports(req,res) {
    const db = getDB()
    const results = []

    fs.createReadStream(req.file.path).pipe(csv())
    .on("data", (data) => {
        results.push({
            userId: req.user.id,
            category: data.category,
            urgebcy: data.urgency,
            message: data.message,
            imagePath: null,
            sourceType: "csv",
            createAat: new Date()
        })
    })
    .on("end", async () => {
        await db.collection("reports").insertMany(results)
    
    res.json({
        message: "CSV uploaded",
        reportsCreated: results.length
    })
    })
}