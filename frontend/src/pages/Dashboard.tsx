import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <h2>Agent Dashboard</h2>

            <Link to="/new-report">New Report</Link><br />
            <Link to={"/upload-csv"}>Upload CSV</Link><br />
            <Link to="/my-reports">My Reports</Link>
        </div>
    )
}