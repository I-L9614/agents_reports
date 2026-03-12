import { useEffect, useState } from "react";
import api from "../api/axios";
import { type Report } from "../types/types";

export default function AdminReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    const load = async () => {
        try {
            setLoading(true);
            const res = await api.get("/reports");
            
            const reportsData = Array.isArray(res.data) ? res.data : (res.data.reports || []);
            
            setReports(reportsData);
            setFilteredReports(reportsData);
        } catch (error) {
            console.error("Error loading all reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (filter === "all") {
            setFilteredReports(reports);
        } else {
            setFilteredReports(reports.filter(r => 
                r.category?.toLowerCase() === filter.toLowerCase()
            ));
        }
    }, [filter, reports]);

    const deleteReport = async (id: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        
        try {
            await api.delete(`/reports/${id}`);
            
            const updatedReports = reports.filter(r => {
                const rid = (r as any)._id || r.id;
                return rid !== id;
            });
            
            setReports(updatedReports);
            alert("Report deleted");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete report");
        }
    };

    if (loading) return <div className="loading-state">Loading all system reports...</div>;

    return (
        <div className="report-container" style={{ maxWidth: '1100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'var(--accent-blue)' }}>System-Wide Reports</h2>
                
                <div className="filter-group">
                    <label style={{ marginLeft: '8px' }}>Filter by Category: </label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="intelligence">Intelligence</option>
                        <option value="logistics">Logistics</option>
                        <option value="alert">Alert</option>
                    </select>
                </div>
            </div>
            
            <table className="reports-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'right' }}>Category</th>
                        <th style={{ textAlign: 'right' }}>Urgency</th>
                        <th style={{ textAlign: 'right' }}>Message</th>
                        <th style={{ textAlign: 'right' }}>Image</th>
                        <th style={{ textAlign: 'right' }}>Date & Time</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((r) => {
                            const reportId = (r as any)._id || r.id;
                            return (
                                <tr key={reportId}>
                                    <td>{r.category}</td>
                                    <td className={`urgency-${r.urgency?.toLowerCase()}`}>
                                        {r.urgency}
                                    </td>
                                    <td>{r.message}</td>
                                    <td>
                                        {r.imagePath ? (
                                            <a href={`http://localhost:5000/${r.imagePath}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)' }}>
                                                View
                                            </a>
                                        ) : "-"}
                                    </td>
                                    <td>{new Date(r.createdAt).toLocaleString('he-IL')}</td>
                                    <td>
                                        <button 
                                            onClick={() => deleteReport(reportId)}
                                            style={{ backgroundColor: 'var(--accent-red)', padding: '5px 10px', fontSize: '0.8rem' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No reports found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}