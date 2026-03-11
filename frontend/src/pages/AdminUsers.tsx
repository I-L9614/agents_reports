import { useEffect, useState } from "react";
import api from "../api/axios";
import { type User } from "../types/types.ts";

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([])

    const [agentCode, setAgentCode] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")

    const loadUsers = async () => {
        const res = await api.get("/users")
        setUsers(res.data)
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const create = async () => {
        await api.post("/users", {
            agentCode,
            fullName,
            password

        })
        loadUsers()
    }

    return (
        <div>
            <h2>Agents</h2>

            <input placeholder="Agent Code" onChange={(e) => setAgentCode(e.target.value)} />

            <input placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>

            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={create}>Create Agent</button>

            <hr />

            {users.map(u => (
                <div key={u.id}>
                    {u.fullName} ({u.agentCode})
                </div>
            ))}
        </div>
    )
}