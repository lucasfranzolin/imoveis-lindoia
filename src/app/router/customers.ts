import { Router } from 'express';

import * as controller from '../controllers/customers';
import { authenticate } from '../middlewares/authenticate';
import { changeAgent } from '../middlewares/change-agent';

const customersRouter = Router();

customersRouter.get('/', authenticate, controller.paginate);
customersRouter.post('/', authenticate, changeAgent, controller.save);

export { customersRouter };
