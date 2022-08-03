import { Router } from 'express';

import { authRouter } from './auth';
import { customersRouter } from './customers';
import { propertiesRouter } from './properties';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use('/auth', authRouter);
router.use('/customers', authenticate, customersRouter);
router.use('/properties', authenticate, propertiesRouter);

export { router };
