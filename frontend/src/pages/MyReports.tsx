import { useEffect, useState } from "react";
import api from "../api/axios";
import { type Report } from "../types/types";

export default function MyReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await api.get("/reports/my");
                setReports(res.data.reports);
            } catch (error) {
                console.error("Error fetching agent reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (loading) {
        return <div className="loading-state">Loading your reports...</div>;
    }

    return (
        <div className="my-reports-container">
            <h2>My Reports</h2>

            {reports.length === 0 ? (
                <p className="no-reports">You haven't submitted any reports yet.</p>
            ) : (
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Urgency</th>
                            <th>Message</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id}>
                                <td>{r.category}</td>
                                <td className={`urgency-${r.urgency.toLowerCase()}`}>{r.urgency}</td>
                                <td>{r.message}</td>
                                <td>{new Date(r.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}