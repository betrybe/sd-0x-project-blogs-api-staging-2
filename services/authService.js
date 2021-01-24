const AuthResponse = require('../models/auth/authResponse');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "VF^6e7k2^5N@"

const authenticateUser = (login, password) => {
    if (login === 'abc' && password === '123')
        return new AuthResponse(true, generateJWT(1));
    return new AuthResponse(false, 'Login ou senha inválidos');
}

const generateJWT = (userId) => {
    return jwt.sign({ userId }, TOKEN_SECRET, { expiresIn: '1800s' })
}

const tokenIsValid = (token) => {
    try {
        jwt.verify(token, TOKEN_SECRET)
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { authenticateUser, tokenIsValid };
