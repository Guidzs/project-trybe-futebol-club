import { Op } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IGoals, IMatches } from '../interfaces/Interfaces';

const getAll = async () => {
  const matches = await Matches.findAll({
    include: [
      {
        model: Teams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      },
    ],
  });
  return matches;
};

const getInProgress = async (inProgress: boolean) => {
  const matches = await Matches.findAll({
    where: { inProgress },
    include: [
      {
        model: Teams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      },
    ],
  });
  return matches;
};

const insertMatch = async (Match: IMatches) => {
  const { homeTeamId, awayTeamId } = Match;

  const teams = await Teams.findAll({ where: {
    [Op.or]: [{ id: homeTeamId }, { id: awayTeamId }],
  } });
  if (teams.length < 2) {
    return null;
  }

  const newMatch = await Matches.create({ ...Match, inProgress: true });
  return newMatch;
};

const updateInProgress = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
};

const updateGoals = async (id: number, Goals: IGoals) => {
  await Matches.update(Goals, { where: { id } });
}

export default {
  getAll,
  getInProgress,
  insertMatch,
  updateInProgress,
  updateGoals,
};
