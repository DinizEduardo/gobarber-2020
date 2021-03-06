import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

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

appointmentRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  }
}), appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentsController.index);
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default appointmentRouter;
