import * as express from 'express';
import matchesController from '../controllers/matchesController';
import tokenValidate from '../middlewares/tokenValidate';

const router = express.Router();

router.post('/', tokenValidate, matchesController.insertMatch);

router.get('/', matchesController.getAll);

router.patch('/:id/finish', matchesController.updateInProgress);

router.patch('/:id', matchesController.updateGoals);

export default router;
