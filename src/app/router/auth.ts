import { Router } from 'express';

import * as controller from '../controllers/auth';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Router();

authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in', controller.signIn);
authRouter.post('/sign-out', controller.signOut);
authRouter.post('/refresh', controller.refresh);
authRouter.get('/session', authenticate, controller.session);
authRouter.get('/verify/:confirmationToken', controller.verify);

export { authRouter };
