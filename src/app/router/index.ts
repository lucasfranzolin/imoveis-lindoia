import { Router } from 'express';

import { authRouter } from './auth';
import { customersRouter } from './customers';

const router = Router();

router.use('/auth', authRouter);
router.use('/customers', customersRouter);

export { router };
