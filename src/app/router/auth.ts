import { Router } from 'express';

import * as controller from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', controller.register);

export { authRouter };
