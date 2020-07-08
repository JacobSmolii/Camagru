const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                res.status(401).json({ message: "Invalid credentials" });
            }
            req.token = decodedPayload;
            next();
        })
    } catch {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
