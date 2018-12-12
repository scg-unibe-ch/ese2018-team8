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

/**
 * Interface for registering a new business user.
 * Request Type: POST
 * Path: baseUrl + /auth/register
 * Request Body:
 *  {
 *      "email": string
 *      "password": string
 *      "company": {
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *      }
 *  }
 *  return:
 *      201:
 *       {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *       }
 */
router.post('/register', async (req: Request, res: Response) => {
    const instanceUser = new User();
    const instanceCompany = new Company();
    instanceUser.fromSimplification(req.body);
    if (instanceUser.email == null || instanceUser.password == null || req.body['company'] == null) {
        res.statusCode = 500;
        res.send('There was a problem registering the user.');
    }
    // password gets hashed before storing it in the database
    instanceUser.password = bcrypt.hashSync(instanceUser.password, 8);
    // role, isVerified, and isUpdatedByAdmin fields are set to the default values for new business user
    instanceUser.role = 'business';
    instanceUser.isVerified = false;
    instanceUser.isUpdatedByAdmin = true;
    instanceCompany.fromSimplification(req.body['company']);

    await instanceUser.save().then( async () => {
        instanceCompany.userId = instanceUser.id;
        await instanceCompany.save();
        res.statusCode = 201;
        res.send(instanceUser.toSimplification());
    }).catch( () => {
        res.statusCode = 500;
        res.send('There was a problem registering the user.');
    });

});

/**
 * Interface that verifies the JWT and returns the payload of the JWT as plaintext
 * Request Type: GET
 * Path: baseUrl + /auth/me
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *  none
 *  return:
 *      200:
 *      {
 *          "id": number
 *          "role": string
 *          "companyId": number
 *      }
 */
router.get('/me', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send(res.locals.verifiedToken);
});

/**
 * Interface that verifies the given email and password and returns a JWT for the user that is valid for 24 hours
 * Request Type: POST
 * Path: baseUrl + /auth/login
 * Request Body:
 *  {
 *      "email": string
 *      "password": string
 *  }
 *  return:
 *      200:
 *      {
 *          "auth": boolean
 *          "token": JWT/null
 *      }
 */
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
    // find user with the same email in the database
    await User.findOne(options).then(  user => {

        if (!user) {
            return res.status(404).send('No user found.');
        }
        // if there is a user compare passwords
        const passwordIsValid = bcrypt.compareSync(instance.password, user.password);

        if (!passwordIsValid || !user.isVerified) {
            return res.status(401).send({auth: false, token: null});
        }
        // if passwords match then generate JWT
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

/**
 * Interface that lets a logged-in user change its password.
 * Request Type: PUT
 * Path: baseUrl + /auth/change-password
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *  {
 *      "oldPassword": string
 *      "newPassword": string
 *  }
 *  return:
 *      201:
 *      "Password changed"
 */
router.put('/change-password', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    // hash the new password
    let newPassword = req.body.newPassword;
    newPassword = bcrypt.hashSync(newPassword, 8);

    const instance = new User();
    instance.fromSimplification(req.body);
    const options = {
        where: {
            id: res.locals.verifiedToken.id
        }
    };
    // find logged-in user in database
    await User.findOne(options).then( async user => {
        console.log('User found');
        if (!user) {
            return res.status(404).send('No user found.');
        }
        // check if oldPassword matches the password in the database
        const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

        if (!passwordIsValid || !user.isVerified) {
            return res.status(401).send('Password not valid');
        }
        // replace the current password with newPassword and save it to the database
        user.password = newPassword;
        await user.save({fields: ['password']}).then( async () => {
            res.statusCode = 202;
            res.send();
        }).catch( () => {
            res.statusCode = 500;
            res.send('There was a problem with changing the password');
        });


    }).catch(() => {
        res.status(500).send('Error on the server.');
    });



});

/**
 * Interface for loging out the current user.
 * Comment: This interface is not currently needed since the backend works with JWTs and is therefore stateless.
 * Request Type: GET
 * Path: baseUrl + /auth/logout
 * Request Body:
 *  none
 *  return:
 *      200:
 *      {
 *          auth: boolean
 *          token: null
 *      }
 */
router.get('/logout', async function (req: Request, res: Response)  {
    res.status(200).send({ auth: false, token: null });
});


export const AuthController: Router = router;
