import { useState } from "react";
import api from "../api/axios";
import "./UploadCSV.css"; 

export default function UploadCSV() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setStatus(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus({ type: 'error', msg: "Please select a CSV file first." });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setStatus(null);
            
            await api.post("/reports/csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setStatus({ type: 'success', msg: "File uploaded and processed successfully!" });
            setFile(null); 
        } catch (error: any) {
            console.error("Upload error:", error);
            const errorMsg = error.response?.data?.message || "Failed to upload CSV. Ensure the format is correct.";
            setStatus({ type: 'error', msg: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Upload Reports (CSV)</h2>
                <p>Select a CSV file to import multiple reports into the system.</p>
                
                <div className="file-input-wrapper">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange} 
                        id="csv-file"
                    />
                    <label htmlFor="csv-file" className="file-label">
                        {file ? file.name : "Click to browse or drag file here"}
                    </label>
                </div>

                {status && (
                    <div className={`status-message ${status.type}`}>
                        {status.msg}
                    </div>
                )}

                <button 
                    onClick={handleUpload} 
                    disabled={loading || !file}
                    className="upload-btn"
                >
                    {loading ? "Processing..." : "Upload & Import"}
                </button>
            </div>
        </div>
    );
}