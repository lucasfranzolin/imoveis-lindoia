import { Router } from 'express';

import * as controller from '../controllers/customers';
import { changeAgent } from '../middlewares/change-agent';

const customersRouter = Router();

customersRouter.get('/', controller.paginate);
customersRouter.post('/', changeAgent, controller.save);

export { customersRouter };
