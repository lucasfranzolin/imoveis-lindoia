import { Router } from 'express';

import authRouter from './auth';
import customersRouter from './customers';
import realtorsRouter from './realtors';

const router = Router();

router.use('/auth', authRouter);
router.use('/customers', customersRouter);
router.use('/realtors', realtorsRouter);

export { router };
