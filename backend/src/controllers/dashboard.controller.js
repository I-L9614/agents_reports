import { getDasboardState } from "../services/dashboard.service.js";

export async function getStates(req, res) {
    try {
        const state = await getDasboardState()

        res.json(state)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}