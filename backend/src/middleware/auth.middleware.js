import jwt from 'jsonwebtoken'

export function requireAuth(req,res,next) {
    try{
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing"
            })
        }

        if (!authHeader.startWith("Bearer")) {
            return res.status(401).json({
                meassge: "Invalid authorization format"
            })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.uesr = decoded
        next()
    } catch(error) {
        res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}