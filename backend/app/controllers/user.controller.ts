import {Router, Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model';

const bcrypt = require('bcryptjs');
const router: Router = Router();

const verifyToken = require('../middleware/verifyToken.middleware');

router.get('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin'){
        const instances = await User.findAll();
        res.statusCode = 200;
        res.send(instances.map(e => e.toSimplification()));
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }
});

router.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.verifiedToken.role === 'admin'){
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
        instance.fromSimplification(req.body);
        await instance.save({fields: ['isVerified']});
        res.statusCode = 200;
        res.send(instance.toSimplification());
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }

});

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
        instance.fromSimplification(req.body);
        await instance.destroy();
        res.statusCode = 204;
        res.send();
    } else {
        res.status(500).send({ auth: false, message: 'Not Authorized!'});
    }


});

export const UserController: Router = router;