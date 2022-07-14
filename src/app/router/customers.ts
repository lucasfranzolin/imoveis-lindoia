import { Router } from 'express';

import * as controller from '../controllers/customers';
import { changeAgent } from '../middlewares/change-agent';

const customersRouter = Router();

customersRouter.get('/', controller.paginate);
customersRouter.post('/', changeAgent, controller.save);
customersRouter.get('/:id', controller.get);
customersRouter.put('/:id', changeAgent, controller.update);
customersRouter.delete('/:id', changeAgent, controller._delete);

export { customersRouter };
