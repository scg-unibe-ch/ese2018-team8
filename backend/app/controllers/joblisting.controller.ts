import {Router, Request, Response, NextFunction} from 'express';
import {JobListing} from '../models/joblisting.model';


const router: Router = Router();

const verifyToken = require('../middleware/verifyToken.middleware');

router.get('/', async (req: Request, res: Response) => {
    const instances = await JobListing.findAll();
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.post('/', async (req: Request, res: Response) => {
    const instance = new JobListing();
    instance.fromSimplification(req.body);
    instance.isVerified = false;
    await instance.save();
    res.statusCode = 201;
    res.send(instance.toSimplification());
});
router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
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

router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    instance.fromSimplification(req.body);
    instance.isVerified = false;
    await instance.save();
    res.statusCode = 200;
    res.send(instance.toSimplification());
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
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobListing.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    await instance.destroy();
    res.statusCode = 204;
    res.send();
});

export const JobListingController: Router = router;
