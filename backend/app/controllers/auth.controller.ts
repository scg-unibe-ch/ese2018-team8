// auth.controller.ts

import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('../middleware/verifyToken.middleware');

router.post('/register', async (req: Request, res: Response) => {
    const instance = new User();
    instance.fromSimplification(req.body);
    instance.password = bcrypt.hashSync(instance.password, 8);
    instance.role = 'business';
    instance.isVerified = false;

    await instance.save().then( () => {
        res.statusCode = 201;
        res.send('Account registration successful');
    }).catch( () => {
        res.statusCode = 500;
        res.send('There was a problem registering the user.');
    });

});

router.get('/me', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send(res.locals.verifiedToken);
});

router.post('/login', async function (req: Request, res: Response) {
    const instance = new User();
    instance.fromSimplification(req.body);
    const options = {
            where: {
                email: instance.email
            }
        };
    await User.findOne(options).then(  user => {
            if (!user) { return res.status(404).send('No user found.'); }

            const passwordIsValid = bcrypt.compareSync(instance.password, user.password);

            if (!passwordIsValid || !user.isVerified) {
                return res.status(401).send({auth: false, token: null});
            }

            const token = jwt.sign({id: user.id, role: user.role}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({auth: true, token: token});
    }).catch(() => {
        res.status(500).send('Error on the server.');
    });
});

router.get('/logout', async function (req: Request, res: Response)  {
    res.status(200).send({ auth: false, token: null });
});

export const AuthController: Router = router;
