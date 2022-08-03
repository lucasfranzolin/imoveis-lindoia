import { Router } from 'express';

import * as controller from '../controllers/customers';

const customersRouter = Router();

customersRouter.get('/:id', controller.get);
customersRouter.put('/:id', controller.update);
customersRouter.delete('/:id', controller._delete);

customersRouter.get('/', controller.paginate);
customersRouter.post('/', controller.save);

export { customersRouter };
