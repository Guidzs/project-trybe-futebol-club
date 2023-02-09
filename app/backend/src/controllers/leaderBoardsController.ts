import { Request, Response } from 'express';
import leaderBoardsService from '../services/leaderboardsService';

const getLeaderBoards = async (req: Request, res: Response) => {
  const { path } = req;
  const leaders = await leaderBoardsService.getLeaders(path);
  res.status(200).json(leaders);
};

export default { getLeaderBoards };
