import { useState,useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [agentCode, setAgentCode] = useState("")
    const [password, setPassword] = useState("")

    const {setToken} = useContext(AuthContext)

    const navigate = useNavigate()

    const login = async () => {
        try {
            const res = await api.post("/auth/login", {
                agentCode,
                password
            })

            localStorage.setItem("token", res.data.token)

            setToken(res.data.token)

            navigate("/dashboard")
        } catch(error) {
            alert("Login failed")
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Agent Code" value={agentCode} onChange={(e) => setAgentCode(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
        </div>
    )
}