import { Router } from 'express';

import * as controller from '../controllers/auth';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Router();

authRouter.post('/login', controller.login);
authRouter.post('/logout', authenticate, controller.logout);
authRouter.post('/refresh-token', controller.refreshToken);
authRouter.post('/register', authenticate, controller.register);
authRouter.post('/verify', authenticate, controller.verify);

export { authRouter };
