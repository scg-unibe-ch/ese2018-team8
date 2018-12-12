import {Router, Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model';

const bcrypt = require('bcryptjs');
const router: Router = Router();

const verifyToken = require('../middleware/verifyToken.middleware');

/**
 * Interface for the admin to get the data of all users
 * Request Type: GET
 * Path: baseUrl + /user/
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 * none
 *  return:
 *      201:
 *      [
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 *      ]
 */
router.get('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin'){
        const instances = await User.findAll();
        res.statusCode = 200;
        res.send(instances.map(e => e.toSimplification()));
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }
});

/**
 * Interface for the admin to create a new user without the limitations of the /auth/register interface.
 * This interface could be used to add a new admin user.
 * Request Type: POST
 * Path: baseUrl + /user/
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 *  return:
 *      201:
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin') {
        const instance = new User();
        instance.fromSimplification(req.body);
        instance.password = bcrypt.hashSync(instance.password, 8);
        await instance.save();
        res.statusCode = 201;
        res.send(instance.toSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }
});

/**
 * Interface to create initial admin user
 * Request Type: POST
 * Path: baseUrl + /user/init/
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *          {
 *          'id': number
 *          'email': string
 *          }
 *  return:
 *      201:
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.post('/init/', async (req: Request, res: Response) => {
    const instance = new User(req.body);
    User.findAll().then(instances => {
        if (instances.length === 0) {
            const password = bcrypt.hashSync(instance.password, 8);
            instance.password = password;
            instance.role = 'admin';
            instance.isVerified = true;
            instance.save().then(user => {
                res.statusCode = 201;
                res.send(user.toSimplification());
            });
        } else {
            res.status(500).send({ auth: false, message: 'Not Authorized!'});
        }
    });
});




/**
 * Interface get the user date of the user with the given id.
 * Users are only authorized to request their own data, while an admin user can request the data of all users.
 * Request Type: GET
 * Path: baseUrl + /user/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *      {
 *          'isVerified': boolean
 *          'comment': string
 *      }
 *  return:
 *      200:
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.get('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);

    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.id === id)) {

        const instance = await User.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'not found'
            });
            return;
        }
        res.statusCode = 200;
        res.send(instance.toSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface for the admin to verify a user and leave a comment for the user if needed
 * Request Type: PUT
 * Path: baseUrl + /user/setIsVerified/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *      {
 *          'isVerified': boolean
 *          'comment': string
 *      }
 *  return:
 *      200:
 *          {
 *          'id': number
 *          'email': string
 *          'role': string
 *          'isVerified': boolean
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.put('/setIsVerified/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (res.locals.verifiedToken.role === 'admin') {

        const instance = await User.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'not found'
            });
            return;
        }
        // only isVerified, comment, isUpdatedByAdmin fields are updated
        instance.fromSimplification(req.body);
        instance.isUpdatedByAdmin = true;
        await instance.save({fields: ['isVerified', 'comment', 'isUpdatedByAdmin']});
        res.statusCode = 200;
        res.send(instance.toSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface to delete a user with the given id and the company and joblisting data linked to the user
 * Only an admin user may delete a user
 * Request Type: DELETE
 * Path: baseUrl + /user/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 * none
 *  return:
 *      204:
 */
router.delete('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin') {

        const id = parseInt(req.params.id);
        const instance = await User.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'not found'
            });
            return;
        }
        // the models were defined so that the destroy query cascades
        // and deletes not only the user put all company and joblisting data associated to the user
        await instance.destroy();
        res.statusCode = 204;
        res.send();
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }


});

export const UserController: Router = router;