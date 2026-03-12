import fs from "fs";
import csv from "csv-parser";
import { getDB } from "../db/mongo.js";
import { ObjectId } from "mongodb";

export async function uploadCSVReports(req, userId) {
    const db = getDB();
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => {
                results.push({
                    userId: new ObjectId(userId), 
                    category: (data.category || "alert").toLowerCase(),
                    urgency: (data.urgency || "low").toLowerCase(),
                    message: data.message || "No message provided",
                    imagePath: null,
                    sourceType: "csv",
                    createdAt: new Date()
                });
            })
            .on("end", async () => {
                try {
                    let insertResult = { insertedCount: 0 };
                    if (results.length > 0) {
                        insertResult = await db.collection("reports").insertMany(results);
                    }
                    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                    resolve(insertResult);
                } catch (err) {
                    reject(err);
                }
            })
            .on("error", (err) => reject(err));
    });
}