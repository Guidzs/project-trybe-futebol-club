import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

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

export default {
  getAll,
  getInProgress,
};
