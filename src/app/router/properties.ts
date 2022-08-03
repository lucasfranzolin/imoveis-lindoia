import { Router } from 'express';

import * as controller from '../controllers/properties';

const propertiesRouter = Router();

propertiesRouter.get('/purposes', controller.getPurposes);
propertiesRouter.get('/purposes/:purpose/types', controller.getTypesByPurpose);

propertiesRouter.get('/:id/media', controller.getMedia);
propertiesRouter.post('/:id/media', controller.storeMedia);

propertiesRouter.get('/:id', controller.get);
propertiesRouter.put('/:id', controller.update);
propertiesRouter.delete('/:id', controller._delete);

propertiesRouter.get('/', controller.paginate);
propertiesRouter.post('/', controller.save);

export { propertiesRouter };
