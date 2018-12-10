import {Router, Request, Response, NextFunction} from 'express';
import {JobListing} from '../models/joblisting.model';
import * as sequelize from 'sequelize';


const router: Router = Router();

const verifyToken = require('../middleware/verifyToken.middleware');

/**
 * Interface that returns all joblistings regardless of their status and owner.
 * This interface may only me used by admin users
 * Request Type: GET
 * Path: baseUrl + /joblisting/
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 * none
 * return:
 *      200:
 *      [
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 *      ]
 */
router.get('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin') {
        const instances = await JobListing.findAll();
        res.statusCode = 200;
        res.send(instances.map(e => e.toPrivateSimplification()));
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface that returns all joblistings that were already verified.
 * A search string may be passed along to limit the returned joblistings
 * to joblistings containing one of the keywords in the search string.
 *
 * Request Type: GET
 * Path: baseUrl + /joblisting/public[?search=string]
 * Request Body:
 * none
 * return:
 *      200:
 *      [
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          }
 *      ]
 */
router.get('/public/', async (req: Request, res: Response) => {
    const Op = sequelize.Op;
    let search = req.query.search;
    const  whereClause: { [key: string]: any } = {};
    whereClause['isVerified'] = true;

    // if a search string was passed along then the filter for the sequelize query has to be built
    if (search !=  null) {
        // for each non empty keyword in the search string the key word is searched for in the fields: title, description,
        // skills and branche. All filters for keywords are linked with an or-operator.
        search = decodeURIComponent(search).trim();
        search.split(' ').forEach(function (keyword: string) {
            keyword = keyword.trim();
            if (keyword !== '') {
                if (whereClause[Op.or] == null) {
                    whereClause[Op.or] = [];
                }
                whereClause[Op.or].push( { title: { [Op.like]: '%' + keyword + '%' } } );
                whereClause[Op.or].push( { description: { [Op.like]: '%' + keyword + '%' } } );
                whereClause[Op.or].push( { skills: { [Op.like]: '%' + keyword + '%' } } );
                whereClause[Op.or].push( { branche: { [Op.like]: '%' + keyword + '%' } } );
            }
        });

    }
    const options = {
        where: whereClause
    };

    const instances = await JobListing.findAll(options);
    if (instances !== null) {
        res.statusCode = 200;
        res.send(instances.map(e => e.toPublicSimplification()));
    } else {
        res.statusCode = 200;
        res.send([]);
    }

});


/**
 * Interface that returns all joblistings of the logged in user regardless of their status.
 * This interface may only me used by business users
 * Request Type: GET
 * Path: baseUrl + /joblisting/private
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 * none
 * return:
 *      200:
 *      [
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 *      ]
 */
router.get('/private/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    // only business users may access this interface
    if (res.locals.verifiedToken.role === 'business') {
        const options = {
            where: {
                companyId: res.locals.verifiedToken.companyId
            }
        };
        const instances = await JobListing.findAll(options);
        if (instances !== null) {
            res.statusCode = 200;
            res.send(instances.map(e => e.toPrivateSimplification()));
        } else {
            res.statusCode = 200;
            res.send([]);
        }
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }



});


/**
 * Interface to create a new joblisting.
 * Business users may only create joblistings for their own company
 * Request Type: POST
 * Path: baseUrl + /joblisting/
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *      {
 *          'title': string
 *          'description': string
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *      }
 *  return:
 *      201:
 *      [
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 *      ]
 */
router.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const instance = new JobListing();

    // with the exception of admin users, users may only post joblistings for their own company
    instance.fromSimplification(req.body);
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === instance.companyId )) {
        // since the joblisting needs to be verified by the admin the flags are set accordingly regardless of the passed information
        instance.isVerified = false;
        instance.isUpdatedByAdmin = false;
        await instance.save();
        res.statusCode = 201;
        res.send(instance.toPrivateSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }


});

/**
 * Interface that returns the data of the joblisting with the given id.
 * This interface is avaliable for everyone if the requested joblisting was already verified by the admin and is therefore public.
 * Only if the requested joblisting is not public the token is verified to determin if the logged in user is the owner of the joblisting
 * Request Type: GET
 * Path: baseUrl + /joblisting/:id
 * Request Header: {Authorization: Bearer JWT} only needed for private joblistings
 * Request Body:
 * none
 * return:
 *      200:
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string, only if the record is private
 *          'isUpdatedByAdmin': boolean, only if the record is private
 *          }
 */
router.get('/:id', [isPublicRecord, verifyToken], async (req: Request, res: Response, next: NextFunction) => {

    // requests for public joblistings are processed in the isPublicRecord middleware
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    // the private joblisting data is only return if the logged in user is an admin or is the owner of the joblisting data
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === instance.companyId )) {
        res.statusCode = 200;
        res.send(instance.toPrivateSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface to update the joblisting with the given id
 * Business users may only update joblistings of their own company
 * Request Type: PUT
 * Path: baseUrl + /joblisting/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 *      {
 *          'title': string
 *          'description': string
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *      }
 *  return:
 *      201:
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === instance.companyId )) {
        const previousCompanyId = instance.companyId;
        instance.fromSimplification(req.body);
        // check that the companyId was not changed
        if ( previousCompanyId === instance.companyId) {
            // reset verified flags since changes need to be verified by admin
            instance.isVerified = false;
            instance.isUpdatedByAdmin = false;
            await instance.save();
            res.statusCode = 200;
            res.send(instance.toPrivateSimplification());
        } else {
            res.status(500).send({ auth: false, message: 'CompanyID can not be changed!'});
        }
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface for the admin to verify a joblisting and leave a comment for the owner if needed
 * Request Type: PUT
 * Path: baseUrl + /joblisting/setIsVerified/:id
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
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          'comment': string
 *          'isUpdatedByAdmin': boolean
 *          }
 */
router.put('/setIsVerified/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (res.locals.verifiedToken.role === 'admin') {

        const instance = await JobListing.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'not found'
            });
            return;
        }
        // only isVerified, comment, isUpdatedByAdmin fields are updated
        instance.isVerified = req.body['isVerified'];
        instance.comment = req.body['comment'];
        instance.isUpdatedByAdmin = true;
        await instance.save({fields: ['isVerified', 'comment', 'isUpdatedByAdmin']});
        res.statusCode = 200;
        res.send(instance.toPrivateSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

/**
 * Interface to delete a joblisting with the given id
 * Only an admin user or the owner of the joblisting may delete a joblisting
 * Request Type: DELETE
 * Path: baseUrl + /joblisting/:id
 * Request Header: {Authorization: Bearer JWT}
 * Request Body:
 * none
 *  return:
 *      204:
 */
router.delete('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === instance.companyId )) {
        await instance.destroy();
        res.statusCode = 204;
        res.send();
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }


});

/**
 * Middleware for the get request of a specific joblisting. This middleware checks if the requested joblisting is already verified.
 * If that is the case the joblisting data gets return otherwise the request is passed to the next function for further processing
 *
 * return:
 *      200:
 *          {
 *          'id': number
 *          'title': string
 *          'description': string
 *          'creationDate': string in ISO Format
 *          'updateDate': string in ISO Format
 *          'payment': number
 *          'skills': string
 *          'deadline': string in ISO Format
 *          'isVerified': boolean
 *          'branche': string
 *          'jobPensumFrom': number
 *          'jobPensumTo': number
 *          'companyId': number
 *          'contactPerson': string
 *          'contactPhone': string
 *          'contactEmail': string
 *          }
 */
async function  isPublicRecord(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);

    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    } else {
        if ( instance.isVerified) {
            res.statusCode = 200;
            res.send(instance.toPrivateSimplification());
        } else {
            next();
        }
    }



}
export const JobListingController: Router = router;
