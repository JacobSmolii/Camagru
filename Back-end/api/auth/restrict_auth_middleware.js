const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization; // this you need to work with react
        // const token = req.cookies.token; // this needs when you check endpoint in insomnia or postman

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                res.status(401).json({ message: "Invalid credentials here", err });
            }
            req.token = decodedPayload;
            next();
        })
    } catch {
        res.status(401).json({ message: "Invalid credentials in restric_auth_middleware" });
    }
}
