import { useEffect, useState } from "react";
import api from "../api/axios";
import { type User } from "../types/types";

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [agentCode, setAgentCode] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); 

    const loadUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/users");
            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else if (res.data && Array.isArray(res.data.users)) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.error("Error loading users:", err);
            setError("שגיאה בטעינת המשתמשים");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const create = async () => {
        if (!agentCode || !fullName || !password) {
            alert("נא למלא את כל השדות");
            return;
        }
        try {
            await api.post("/users", { 
                agentCode, 
                fullName, 
                password, 
                role: isAdmin ? 'admin' : 'agent' 
            });
            
            setAgentCode(""); setFullName(""); setPassword(""); setIsAdmin(false);
            loadUsers();
            alert("משתמש נוצר בהצלחה");
        } catch (error) {
            alert("יצירת משתמש נכשלה");
        }
    };

    const deleteUser = async (id: string) => {
    if (!id) return;
    if (!window.confirm("האם למחוק משתמש זה?")) return;

    try {
        await api.delete(`/users/${id}`); 
        
        setUsers(prev => prev.filter(u => ((u as any)._id || u.id) !== id));
        alert("נמחק בהצלחה");
    } catch (error: any) {
        console.error("שגיאה במחיקה:", error.response?.data);
        alert(error.response?.data?.message || "המחיקה נכשלה");
    }
};

    if (loading) return <div className="report-container">טוען...</div>;

    return (
        <div className="report-container" style={{ maxWidth: '1000px' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>ניהול משתמשים (סוכנים ומנהלים)</h2>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '15px', 
                marginBottom: '2rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
            }}>
                <div className="form-group">
                    <input placeholder="קוד סוכן" value={agentCode} onChange={(e) => setAgentCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <input placeholder="שם מלא" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                        type="checkbox" 
                        id="isAdmin" 
                        checked={isAdmin} 
                        onChange={(e) => setIsAdmin(e.target.checked)} 
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="isAdmin" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>מנהל מערכת?</label>
                </div>

                <button onClick={create} className="submit-btn" style={{ height: 'fit-content' }}>
                    צור משתמש
                </button>
            </div>

            <table className="reports-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'right' }}>שם מלא</th>
                        <th style={{ textAlign: 'right' }}>קוד</th>
                        <th style={{ textAlign: 'right' }}>תפקיד</th>
                        <th style={{ textAlign: 'right' }}>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => {
                        const userId = (u as any)._id || u.id; 
                        return (
                            <tr key={userId}>
                                <td>{u.fullName}</td>
                                <td>{u.agentCode}</td>
                                <td style={{ color: u.role === 'admin' ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>
                                    {u.role?.toUpperCase()}
                                </td>
                                <td>
                                    <button 
                                        onClick={() => deleteUser(userId)}
                                        style={{ backgroundColor: 'var(--accent-red)', padding: '5px 10px' }}
                                    >
                                        מחק
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}