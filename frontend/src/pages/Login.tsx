import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [agentCode, setAgentCode] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {
                agentCode: agentCode.trim(),
                password: password.trim()
            });

            if (res.data && res.data.token) {
                const { token, user } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setToken(token);
                setUser(user);

                const target = user.role === 'admin' ? "/admin-dashboard" : "/agent-dashboard";
                navigate(target);
            }
        } catch (error: any) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed: " + (error.response?.data?.message || "Please check your credentials"));
        }
    };

    return (
        <div className="login-page-wrapper">

        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group" style={{ textAlign: 'left', direction: 'ltr' }}>
                    <label>Agent Code</label>
                    <input 
                        type="text"
                        placeholder="Enter your code" 
                        value={agentCode} 
                        onChange={(e) => setAgentCode(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group" style={{ textAlign: 'left', direction: 'ltr' }}>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        />
                </div>
                <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '1rem' }}>
                    Login
                </button>
            </form>
        </div>
    </div>
    );
}