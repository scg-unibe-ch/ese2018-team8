import {Request, Response, NextFunction} from 'express';

const jwt = require('jsonwebtoken');
const config = require('../../build/config');

function verifyToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization || !(req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const verifiedToken = jwt.verify(token, config.secret);
        res.locals.verifiedToken = verifiedToken;
        next();
    } catch {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    }

}

module.exports = verifyToken;
