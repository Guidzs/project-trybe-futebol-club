import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const getAll = async (_req: Request, res: Response) => {
  const teams = await teamsService.getAll();
  return res.status(200).json(teams);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await teamsService.getOne(Number(id));

  return res.status(200).json(team);
};

export default {
  getAll,
  getOne,
};
