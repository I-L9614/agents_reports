import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
    

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ Auth Failed: Missing or invalid header");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Auth Success, User:", req.user.id);
        next();
    } catch (error) {
        console.log("❌ Auth Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}
