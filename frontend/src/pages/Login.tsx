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
        e.stopPropagation();

        console.log("1. Login process started");

        try {
            const res = await api.post("/auth/login", {
                agentCode: agentCode.trim(),
                password: password.trim()
            });

            console.log("2. Server response received");

            if (res.data && res.data.token) {
                const { token, user } = res.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setToken(token);
                setUser(user);

                console.log("3. Moving to redirect logic...");

                const target = user.role === 'admin' ? "/admin-dashboard" : "/agent-dashboard";
                navigate(target);
            }
        } catch (error: any) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("התחברות נכשלה: " + (error.response?.data?.message || "בדוק פרטי התחברות"));
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    placeholder="Agent Code" 
                    value={agentCode} 
                    onChange={(e) => setAgentCode(e.target.value)} 
                    required 
                />
                <br /><br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}