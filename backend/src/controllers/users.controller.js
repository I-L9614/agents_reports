import { createUser, getAllUsers, removeUser } from "../services/users.service.js";
export async function createAgent(req,res) {
    try{
        const {agentCode, fullName, password} = req.body

        if(!agentCode || !fullName || !password) {
            return res.status(400).json({
                message: "agentCode, fullName and password are required"
            })
        }

        const user = await createUser({
            agentCode,
            fullName,
            password,
            role: 'agent'
        })

        res.status(201).json({
        message: "Agent created successfully", user
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function  getUsers(req,res) {
    try {
        const users = await getAllUsers()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        if (req.user?._id === id) {
            return res.status(400).json({ message: "אינך יכול למחוק את המשתמש של עצמך" });
        }

        const result = await removeUser(id);

        if (!result) {
            return res.status(404).json({ message: "משתמש לא נמצא" });
        }

        res.status(200).json({ message: "משתמש נמחק בהצלחה" });
    } catch (error) {
        res.status(500).json({ message: "שגיאת שרת במחיקת משתמש", error: error.message });
    }
}