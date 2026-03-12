import { useState } from "react";
import api from "../api/axios";

export default function NewReport() {
    const [category, setCategory] = useState("intelligence");
    const [urgency, setUrgency] = useState("low");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const submit = async () => {
        if (!message) {
            alert("Please enter a message");
            return;
        }

        const formData = new FormData();
        formData.append("category", category);
        formData.append("urgency", urgency);
        formData.append("message", message);

        if (image) {
            formData.append("image", image);
        }

        try {
            await api.post("/reports", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Report Created Successfully");
            setMessage("");
            setImage(null);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit report");
        }
    };

    return (
        <div className="report-container">
            <h2>Create New Report</h2>
            
            <div className="form-group">
                <label>Category:</label>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="intelligence">Intelligence</option>
                    <option value="logistics">Logistics</option>
                    <option value="alert">Alert</option>
                </select>
            </div>

            <div className="form-group">
                <label>Urgency Level:</label>
                <select 
                    value={urgency} 
                    onChange={(e) => setUrgency(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="form-group">
                <label>Message Content:</label>
                <textarea 
                    placeholder="Enter report details..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Attach Evidence (Image):</label>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
            </div>

            <button className="submit-btn" onClick={submit}>
                Submit Report
            </button>
        </div>
    );
}