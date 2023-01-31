import * as express from 'express';
import matchesController from '../controllers/matchesController';

const router = express.Router();

router.get('/', matchesController.getAll);

export default router;
