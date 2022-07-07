import { Router } from 'express';

import * as controller from '../controllers/auth';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.post('/login', controller.login);
router.post('/refresh-token', controller.refreshToken);
router.post('/logout', authenticate, controller.logout);
router.get('/session/:sessionId', authenticate, (req, res) => {
    res.json({
        email: 'test@test.com',
    });
});

export default router;
