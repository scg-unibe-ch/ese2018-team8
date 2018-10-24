import {Router, Request, Response} from 'express';
import {Company} from '../models/company.model';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const instances = await Company.findAll();
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.post('/', async (req: Request, res: Response) => {
    const instance = new Company();
    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 201;
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
router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
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
});
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await Company.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    instance.fromSimplification(req.body);
    await instance.destroy();
    res.statusCode = 204;
    res.send();
});

export const CompanyController: Router = router;