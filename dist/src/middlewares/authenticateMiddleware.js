const jwt = require("jsonwebtoken");
// Jwt authenticate middleware protects routes without repetitive token checks in controllers.
// It ensures users are authenticated before accessing restricted resources.
export function authenticateMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        else {
            req.body.user = user;
        }
        next();
    });
}
