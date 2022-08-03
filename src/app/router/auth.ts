import { Router } from 'express';

import * as controller from '../controllers/auth';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Router();

authRouter.post('/signup', controller.signup);
authRouter.post('/signin', controller.signin);
authRouter.post('/refresh', controller.refresh);
authRouter.get('/test', authenticate, (req, res) => {
    res.send('Funcionou!!!');
});

export { authRouter };
