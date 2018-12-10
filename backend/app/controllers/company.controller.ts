import {Router, Request, Response, NextFunction} from 'express';
import {Company} from '../models/company.model';

const router: Router = Router();
const verifyToken = require('../middleware/verifyToken.middleware');

/**
 * Interface that returns all company objects in the database
 * Request Type: GET
 * Path: baseUrl + /company/
 * Request Body:
 *  none
 *  return:
 *      200:
 *      [
 *          {
 *          "id": number
 *          "userId": number
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *          }
 *      ]
 */
router.get('/', async (req: Request, res: Response) => {

    const instances = await Company.findAll();
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

/**
 * Interface that returns the company associated with the user with the given userId
 * Request Type: GET
 * Path: baseUrl + /company/byUserId?userId=:userId
 * Request Body:
 *  none
 *  return:
 *      200:
 *      {
 *          "id": number
 *          "userId": number
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *      }
 */
router.get('/byUserId', async (req: Request, res: Response) => {
    const userId = parseInt(req.query.userId);
    let options = {};
    if (userId != null) {
        options = {
            where: {
                userId: userId
            }
        };
    }
    const instance = await Company.findOne(options);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
});

/**
 * Interface that returns the company with the given id
 * Request Type: GET
 * Path: baseUrl + /company/:id
 * Request Body:
 *  none
 *  return:
 *      200:
 *      {
 *          "id": number
 *          "userId": number
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *      }
 */
router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await Company.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
});

/**
 * Interface to update the company data of the company given by the id. Only a admin user
 * or the business user that owns the company data is allowed to change the record.
 * Request Type: PUT
 * Path: baseUrl + /company/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *      {
 *          "userId": number
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *      }
 *  return:
 *      200:
 *      {
 *          "id": number
 *          "userId": number
 *          "companyName": string
 *          "companyStreet": string
 *          "companyZIP": string
 *          "companyCity": string
 *          "companyPhone": string
 *          "companyPerson": string
 *          "companyWebsite": string
 *      }
 */
router.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    // check if logged in user is admin or is the owner of the company
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === id )) {

        const instance = await Company.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'not found'
            });
            return;
        }
        // check that userId was not changed
        instance.fromSimplification(req.body);
        if (instance.userId !== res.locals.verifiedToken.id ) {
            res.status(500).send({ auth: false, message: 'Not Authorized!'});
        }
        await instance.save();
        res.statusCode = 200;
        res.send(instance.toSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});


export const CompanyController: Router = router;
