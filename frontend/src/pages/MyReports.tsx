import { useEffect,useState } from "react";
import api from "../api/axios";
import { type Report } from "../types/types.ts";

export default function MyReports() {
    const [ reports, setReports] = useState<Report[]>([])
    useEffect(() => {
        const fetchReport = async () => {
            const res = await api.get("/reports/my")

            setReports(res.data.reports)
        }
        fetchReport()
    },[])

    return (
        <div>
            <h2>My Reports</h2>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Urgency</th>
                        <th>Message</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map((r) => (
                        <tr key={r.id}>
                            <td>{r.category}</td>
                            <td>{r.urgency}</td>
                            <td>{r.message}</td>
                            <td>{new Date(r.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
