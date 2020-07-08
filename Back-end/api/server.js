require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const db = require('../DB_modules/account_modules');

const authenticate = require('../api/auth/restrict_auth_middleware')
const authRouter = require('../api/auth/auth_router');
const post = require('./posts');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(cookieParser())


server.get('/', (req, res) => { // see all the pictures
    // console.log(req.cookies.token)

    db.getAllPictures()
        .then(respond => {
            res.status(200).json({respond});
        })
        .catch(err => {
            res.status(500).json({ err: "erro is here"});
        })
});

// server.get('/', authenticate, (req, res) => { // see all the pictures
//     // console.log(req.cookies.token)

//     db.getAllPictures()
//         .then(respond => {
//             res.status(200).json({respond});
//         })
//         .catch(err => {
//             res.status(500).json({ err: "erro is here"});
//         })
// });

server.use('/', authRouter);

server.use('/posts', authenticate, post);


module.exports = server;
