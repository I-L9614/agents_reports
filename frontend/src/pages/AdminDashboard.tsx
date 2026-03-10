import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Link to="/admin/users">Manage Agents</Link>
            <br />
            <Link to="/admin/reports">All Reports</Link>
        </div>
    )
}