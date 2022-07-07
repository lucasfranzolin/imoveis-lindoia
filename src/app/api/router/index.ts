import { Router } from 'express';

import authRouter from './auth';
import realtorsRouter from './realtors';

const router = Router();

router.use('/auth', authRouter);
router.use('/realtors', realtorsRouter);

export { router };
