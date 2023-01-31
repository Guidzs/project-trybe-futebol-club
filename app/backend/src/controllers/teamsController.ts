import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const getAll = async (_req: Request, res: Response) => {
  const teams = await teamsService.getAll();
  return res.status(200).json(teams);
};

export default {
  getAll,
};
