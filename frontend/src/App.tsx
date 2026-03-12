import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/Dashboard";
import NewReport from "./pages/NewReport";
import MyReports from "./pages/MyReports";
import AdminReports from "./pages/AdminReports";
import AdminUsers from "./pages/AdminUsers";
import CsvUpload from "./pages/UploadCSV";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
    const { token, user } = useContext(AuthContext);

    const storedToken = token || localStorage.getItem("token");
    const storedUserRaw = localStorage.getItem("user");
    
    let storedUser = user;
    if (!storedUser && storedUserRaw && storedUserRaw !== "undefined") {
        try {
            storedUser = JSON.parse(storedUserRaw);
        } catch (e) {
            storedUser = null;
        }
    }

    if (!storedToken) {
        return <Navigate to="/login" replace />;
    }

    if (role) {
        if (!storedUser) {
            return <div style={{ padding: "20px", color: "white" }}>Loading user data...</div>;
        }

        const isAuthorized = storedUser.role === role || storedUser.role === 'admin';

        if (!isAuthorized) {
            console.warn(`Access denied: expected ${role}, got ${storedUser.role}`);
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

function App() {
    const { user, token } = useContext(AuthContext);
    const isAuthenticated = token || localStorage.getItem("token");

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={
                    !isAuthenticated ? <Navigate to="/login" replace /> : (
                        user?.role === 'admin' 
                            ? <Navigate to="/admin-dashboard" replace /> 
                            : <Navigate to="/agent-dashboard" replace />
                    )
                } />

                <Route path="/agent-dashboard" element={
                    <PrivateRoute role="agent"><AgentDashboard /></PrivateRoute>
                } />
                <Route path="/my-reports" element={
                    <PrivateRoute role="agent"><MyReports /></PrivateRoute>
                } />
                <Route path="/new-report" element={
                    <PrivateRoute role="agent"><NewReport /></PrivateRoute>
                } />

                <Route path="/reports/csv" element={
                    <PrivateRoute role="agent"><CsvUpload /></PrivateRoute>
                } />

                <Route path="/admin-dashboard" element={
                    <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
                } />
                <Route path="/admin/reports" element={
                    <PrivateRoute role="admin"><AdminReports /></PrivateRoute>
                } />
                <Route path="/admin/users" element={
                    <PrivateRoute role="admin"><AdminUsers /></PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;