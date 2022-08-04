import { Router } from 'express';

import * as controller from '../controllers/auth';

const authRouter = Router();

authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in', controller.signIn);
authRouter.post('/sign-out', controller.signOut);
authRouter.post('/refresh', controller.refresh);

export { authRouter };
