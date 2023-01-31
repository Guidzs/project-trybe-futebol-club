import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress) {
    const matches = await matchesService.getInProgress(inProgress === 'true');
    return res.status(200).json(matches);
  }

  const matches = await matchesService.getAll();
  return res.status(200).json(matches);
};

const insertMatch = async (req: Request, res: Response) => {
  const { body } = req;
  if (body.homeTeamId === body.awayTeamId) {
    return res
      .status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const newMatch = await matchesService.insertMatch(body);

  if (!newMatch) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  return res.status(201).json(newMatch);
};

const updateInProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchesService.updateInProgress(Number(id));

  return res.status(200).json({ message: 'Finished' });
};

export default {
  getAll,
  insertMatch,
  updateInProgress,
};
