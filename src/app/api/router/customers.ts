import { Router } from 'express';

import * as controller from '../controllers/customers';

const router = Router();

router.get('/', controller.paginate);
router.post('/', controller.save);

export default router;
