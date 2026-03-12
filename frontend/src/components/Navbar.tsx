import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, setToken, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    if (!currentUser) return null;

    return (
        <nav className="navbar" style={navStyles}>
            <div className="nav-links">
                <Link to="/" className="nav-logo" style={logoStyles}>
                    Agent System
                </Link>
                
                <Link to="/new-report" style={linkStyles}>New Report</Link>
                <Link to="/reports/csv" style={linkStyles}>Upload CSV</Link>

                {currentUser.role === 'admin' ? (
                    <>
                        <Link to="/admin/reports" style={linkStyles}>All Reports</Link>
                        <Link to="/admin/users" style={linkStyles}>Manage Agents</Link>
                    </>
                ) : (
                    <Link to="/my-reports" style={linkStyles}>My Reports</Link>
                )}
            </div>

            <div className="nav-user" style={userSectionStyles}>
                <span style={{ marginRight: '15px' }}>
                    <strong>{currentUser.fullName}</strong> ({currentUser.role})
                </span>
                <button onClick={logout} style={logoutBtnStyles}>Logout</button>
            </div>
        </nav>
    );
}

const navStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyles: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginRight: '20px',
    color: '#ecf0f1',
    textDecoration: 'none'
};

const linkStyles: React.CSSProperties = {
    color: '#bdc3c7',
    textDecoration: 'none',
    marginRight: '15px',
    fontSize: '0.9rem'
};

const userSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
};

const logoutBtnStyles: React.CSSProperties = {
    padding: '5px 12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};