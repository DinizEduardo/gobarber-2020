import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentsController.index);
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default appointmentRouter;
