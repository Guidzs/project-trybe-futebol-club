import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

// const getAll = async (_req: Request, res: Response) => {
//   const matches = await matchesService.getAll();
//   return res.status(200).json(matches);
// };

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress) {
    const matches = await matchesService.getInProgress(inProgress === 'true');
    return res.status(200).json(matches);
  }

  const matches = await matchesService.getAll();
  return res.status(200).json(matches);
};

export default {
  getAll,
};
