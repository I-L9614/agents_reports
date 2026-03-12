import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Field Agent Dashboard</h2>
                <p>Welcome back. Please select an action to continue.</p>
            </header>

            <div className="dashboard-grid">
                <Link to="/new-report" className="dashboard-card">
                    <div className="card-icon">📝</div>
                    <h3>New Report</h3>
                    <p>File a new operational report from the field in real-time.</p>
                </Link>

                <Link to="/my-reports" className="dashboard-card">
                    <div className="card-icon">📁</div>
                    <h3>My Reports</h3>
                    <p>View and manage the history of reports you have submitted.</p>
                </Link>

                <Link to="/reports/csv" className="dashboard-card">
                    <div className="card-icon">📊</div>
                    <h3>Upload CSV</h3>
                    <p>Import multiple reports from an external CSV file.</p>
                </Link>
            </div>
        </div>
    );
}