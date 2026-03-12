import { Link } from "react-router-dom";
import "./AdminDashboard.css"; 

export default function AdminDashboard() {
    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Admin Control Panel</h1>
                <p>System Overview Management</p>
            </header>

            <nav className="admin-nav-grid">
                <Link to="/admin/users" className="admin-card">
                    <div className="card-icon">👥</div>
                    <div className="card-content">
                        <h2>Manage Agents</h2>
                        <p>Register new and view agent list</p>
                    </div>
                </Link>

                <Link to="/admin/reports" className="admin-card">
                    <div className="card-icon">📊</div>
                    <div className="card-content">
                        <h2>All Reports</h2>
                        <p>Review and filter all reports</p>
                    </div>
                </Link>

                <Link to="/new-report" className="admin-card">
                    <div className="card-icon">📝</div>
                    <div className="card-content">
                        <h2>Create New Report</h2>
                        <p>Submit a manual report</p>
                    </div>
                </Link>

                <Link to="/reports/csv" className="admin-card">
                    <div className="card-icon">📤</div>
                    <div className="card-content">
                        <h2>Import CSV</h2>
                        <p>Upload reports from CSV files</p>
                    </div>
                </Link>
            </nav>
        </div>
    );
}