// auth.controller.ts

import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('../middleware/verifyToken.middleware');

router.post('/register', async (req: Request, res: Response) => {
    const instanceUser = new User();
    const instanceCompany = new Company();
    instanceUser.fromSimplification(req.body);
    instanceUser.password = bcrypt.hashSync(instanceUser.password, 8);
    instanceUser.role = 'business';
    instanceUser.isVerified = false;
    instanceUser.isUpdatedByAdmin = true;
    instanceCompany.fromSimplification(req.body['company']);

    await instanceUser.save().then( async () => {
        instanceCompany.userId = instanceUser.id;
        await instanceCompany.save();
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
            },
            include: [{
                model: Company,
                required: false
            }]
        };
    await User.findOne(options).then(  user => {

        if (!user) { return res.status(404).send('No user found.'); }

            const passwordIsValid = bcrypt.compareSync(instance.password, user.password);

            if (!passwordIsValid || !user.isVerified) {
                return res.status(401).send({auth: false, token: null});
            }

            if (user.role === 'admin') {
                const token = jwt.sign({id: user.id, role: user.role, companyId: null}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({auth: true, token: token});
            } else {
                const token = jwt.sign({id: user.id, role: user.role, companyId: user.company.id}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({auth: true, token: token});
            }

    }).catch(() => {
        res.status(500).send('Error on the server.');
    });
});
/*
router.put('/changePassword', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    newPassword = bcrypt.hashSync(newPassword, 8);

    const instance = new User();
    instance.fromSimplification(req.body);
    const options = {
        where: {
            id: res.locals.verifiedToken.id
        }
    };

    await User.findOne(options).then( async user => {

        if (!user) { return res.status(404).send('No user found.'); }

        const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

        if (!passwordIsValid || !user.isVerified) {
            return res.status(401).send('Password not valid');
        }
        user.password = newPassword;
        await user.save({fields: ['password']}).then( async () => {
            res.statusCode = 201;
            res.send('Password changed');
        }).catch( () => {
            res.statusCode = 500;
            res.send('There was a problem with changing the password');
        });


    }).catch(() => {
        res.status(500).send('Error on the server.');
    });



});
*/
router.get('/logout', async function (req: Request, res: Response)  {
    res.status(200).send({ auth: false, token: null });
});

export const AuthController: Router = router;
