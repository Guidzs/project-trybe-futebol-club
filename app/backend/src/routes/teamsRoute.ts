import * as express from 'express';
import teamsController from '../controllers/teamsController';

const router = express.Router();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getOne);

export default router;
