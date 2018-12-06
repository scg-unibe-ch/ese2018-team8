import {Router, Request, Response, NextFunction} from 'express';
import {Company} from '../models/company.model';

const router: Router = Router();
const verifyToken = require('../middleware/verifyToken.middleware');


router.get('/', async (req: Request, res: Response) => {

    const instances = await Company.findAll();
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

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


router.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
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
        instance.fromSimplification(req.body);
        await instance.save();
        res.statusCode = 200;
        res.send(instance.toSimplification());
    }  else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});


export const CompanyController: Router = router;
