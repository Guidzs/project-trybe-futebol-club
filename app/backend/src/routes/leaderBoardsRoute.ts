import * as express from 'express';
import leaderBoardsController from '../controllers/leaderBoardsController';

const router = express.Router();

router.get('/', leaderBoardsController.getLeaderBoards);
router.get('/home', leaderBoardsController.getLeaderBoards);
router.get('/away', leaderBoardsController.getLeaderBoards);

export default router;
