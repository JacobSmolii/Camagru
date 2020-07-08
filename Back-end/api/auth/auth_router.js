const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../DB_modules/account_modules');

router.post('/register', (req, res) => {
    try {
        const credentials = req.body;
        credentials.password = bcrypt.hashSync(credentials.password, 12);

        db.createAccount(credentials)
            .then(user => {
                if (user) {
                    res.status(201).json({ message: "Account has been created" }); // created
                } else {
                    res.status(400).json({ error: "Try one more time" }); // bad request
                }
            })
            .catch(err => {
                res.status(400).json({ error: "You should try this request with some modifications" }); // bad request
            })
    } catch {
        res.status(409).json({ message: "You need to enter every field witch is asked" }) // conflict (need to add some data)
    }
})

router.post('/login', (req, res) => {
    try {
        const credentials = req.body;
        db.loginUser(credentials.email)
            .then(user => {
                const token = generateToken(user);
                res.cookie('token', token);
                res.status(200).json({ message: `Welcome back ${user.name}`, token: token })
            })
            .catch(err => {
                res.status(401).json({ err: "Invalid email or password" });
            })
    } catch {
        res.status(401).json({ err: "Invalid email or password at this step" });
    }
})

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.name
    }

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
