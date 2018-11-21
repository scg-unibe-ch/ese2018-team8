import {Router, Request, Response, NextFunction} from 'express';
import {JobListing} from '../models/joblisting.model';
import {Company} from '../models/company.model';


const router: Router = Router();

const verifyToken = require('../middleware/verifyToken.middleware');

router.get('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin') {
        const instances = await JobListing.findAll();
        res.statusCode = 200;
        res.send(instances.map(e => e.toSimplification()));
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

router.get('/public/', async (req: Request, res: Response) => {

    const options = {
        where: {
            isVerified: true
        }
    };
    const instances = await JobListing.findAll(options);
    if (instances !== null) {
        res.statusCode = 200;
        res.send(instances.map(e => e.toSimplification()));
    } else {
        res.statusCode = 200;
        res.send([]);
    }

});

router.get('/private/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    if (res.locals.verifiedToken.role === 'business') {
        const options = {
            where: {
                companyId: res.locals.verifiedToken.companyId
            }
        };
        const instances = await JobListing.findAll(options);
        if (instances !== null) {
            res.statusCode = 200;
            res.send(instances.map(e => e.toSimplification()));
        } else {
            res.statusCode = 200;
            res.send([]);
        }
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }



});

router.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const instance = new JobListing();
    instance.fromSimplification(req.body);
    if (res.locals.verifiedToken.role === 'admin' ||
        (res.locals.verifiedToken.role === 'business' && res.locals.verifiedToken.companyId === instance.companyId )) {
        instance.isVerified = false;
        await instance.save();
        res.statusCode = 201;
        res.send(instance.toSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }


});
router.get('/:id', [isPublicRecord, verifyToken], async (req: Request, res: Response, next: NextFunction) => {

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
        res.statusCode = 200;
        res.send(instance.toSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

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
        if ( previousCompanyId === instance.companyId) {
            instance.isVerified = false;
            await instance.save();
            res.statusCode = 200;
            res.send(instance.toSimplification());
        } else {
            res.status(500).send({ auth: false, message: 'CompanyID can not be changed!'});
        }
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

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
        instance.isVerified = req.body['isVerified'];
        await instance.save({fields: ['isVerified']});
        res.statusCode = 200;
        res.send(instance.toSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});
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
            res.send(instance.toSimplification());
        } else {
            next();
        }
    }



}
export const JobListingController: Router = router;
