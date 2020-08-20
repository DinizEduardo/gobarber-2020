import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

import { celebrate, Segments, Joi } from 'celebrate';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), sessionsController.create);
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default sessionRouter;
