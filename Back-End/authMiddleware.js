// authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // Check if the request contains a valid JWT token
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    try {
        // Extract the token from the Authorization header (Bearer token)
        const tokenString = token.split(' ')[1];
        // Verify the token and decode the payload
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;
