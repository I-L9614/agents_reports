import { loginUser } from "../services/auth.service.js";

export async function login(req,res) {
    try{
        const { agentCode, password } = req.body
        if (!agentCode||!password) {
            return res.status(400).json({
                message: "agentCode and password are required"
            })
        }

        const result = await loginUser(agentCode,password)
        res.status(200).json(result)
    } catch (error){
        res.status(401).json({
            message: error.message
        })
    }
}