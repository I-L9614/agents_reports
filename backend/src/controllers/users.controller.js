import { createUser,getAllUsers } from "../services/users.service.js";

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