import { Router } from 'express';

import * as controller from '../controllers/properties';
import { changeAgent } from '../middlewares/change-agent';

const propertiesRouter = Router();

propertiesRouter.get('/purposes', controller.getPurposes);
propertiesRouter.get('/purposes/:purpose/types', controller.getTypesByPurpose);

propertiesRouter.get('/:id/media', controller.getMedia);
propertiesRouter.post('/:id/media', changeAgent, controller.storeMedia);

propertiesRouter.get('/:id', controller.get);
propertiesRouter.put('/:id', controller.update);

propertiesRouter.get('/', controller.paginate);
propertiesRouter.post('/', changeAgent, controller.save);

export { propertiesRouter };
