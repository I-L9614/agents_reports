import { useEffect,useState } from "react";
import api from "../api/axios";
import { type Report } from "../types/types.ts";

export default function AdminReports() {
    const [ reports, setReports ] = useState<Report[]>([])

    useEffect(() => {
        const load = async () => {
            const res = await api.get("/reports")

            setReports(res.data)
        }

        load()
    },[])

    return (
        <div>
            <h2>All Reports</h2>

            {
                reports.map(r => (
                    <div key={r.id}>
                        <b>{r.category}</b>
                        <p>{r.message}</p>
                        <small>Urgency: {r.urgency}</small>
                    </div>
                ))
            }
        </div>
    )
}