import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

// providersRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

providersRouter.get('/', providersController.index);
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default providersRouter;
