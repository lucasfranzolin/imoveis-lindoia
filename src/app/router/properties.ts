import { Router } from 'express';

import * as controller from '../controllers/properties';
import { changeAgent } from '../middlewares/change-agent';

const propertiesRouter = Router();

propertiesRouter.post('/', changeAgent, controller.save);
propertiesRouter.get('/purposes', controller.getPurposes);
propertiesRouter.get('/purposes/:purpose/types', controller.getTypesByPurpose);

export { propertiesRouter };
