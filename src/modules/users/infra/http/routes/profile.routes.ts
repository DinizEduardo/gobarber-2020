import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();


const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  profileController.update
);

profileRouter.get(
  '/',
  profileController.show
);

// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default profileRouter;
