import { Router } from 'express';

import { authRouter } from './auth';
import { customersRouter } from './customers';
import { propertiesRouter } from './properties';

const router = Router();

router.use('/auth', authRouter);
router.use('/customers', customersRouter);
router.use('/properties', propertiesRouter);

export { router };
