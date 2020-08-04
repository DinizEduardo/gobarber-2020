import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', sessionsController.create);
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default sessionRouter;
