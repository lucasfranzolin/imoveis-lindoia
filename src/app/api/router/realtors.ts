import { Router } from 'express';

import * as controller from '../controllers/realtors';

const router = Router();

router.post('/', controller.save);

export default router;
