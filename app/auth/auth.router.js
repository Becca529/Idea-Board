const express = require('express');
const jwt = require('jsonwebtoken');

const { localPassportMiddleware, jwtPassportMiddleware } = require('../auth/auth.strategy');
const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');

const authRouter = express.Router();

//Create a new jsonwebtoken
function createJwtToken(user) {
    return jwt.sign({ user }, JWT_SECRET, {
        subject: user.username,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
}

//Logs user in if valid creditionals
authRouter.post('/login', localPassportMiddleware, (req, res) => {
    const user = req.user.serialize();
    const jwtToken = createJwtToken(user);
    res.json({ jwtToken, user });
});

//Refresh jsonwebtoken 
authRouter.post('/refresh', jwtPassportMiddleware, (req, res) => {
    const user = req.user;
    const jwtToken = createJwtToken(user);
    res.json({ jwtToken, user });
});

module.exports = { authRouter };