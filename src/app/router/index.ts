import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate';
import { authRouter } from './auth';
import { customersRouter } from './customers';
import { propertiesRouter } from './properties';

const router = Router();

router.get('/hello', (req, res) => {
    res.status(200).json({ ok: true });
});

router.use('/auth', authRouter);
router.use('/customers', authenticate, customersRouter);
router.use('/properties', authenticate, propertiesRouter);

export { router };
