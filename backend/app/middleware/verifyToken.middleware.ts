import {Request, Response, NextFunction} from 'express';

const jwt = require('jsonwebtoken');
const config = require('../../build/config');

/**
 * Middleware that checks if a valid JWT was passed with a request.
 * If the JWT was verified sucessfully the decode payload is stored in res.locals.verifiedToken
 * so that the following functions can use the data for the authorization process.
 * If the Token is missing or invalid the request gets rejected.
 *
 * Request Header: {Authorization: Bearer JWT}
 */
function verifyToken(req: Request, res: Response, next: NextFunction) {
    // check if a JWT was passed in the Authorization header
    if (!req.headers.authorization || !(req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    // verify the JWT and store the payload in res.locals.verifiedToken
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
