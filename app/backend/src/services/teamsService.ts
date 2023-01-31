import Teams from '../database/models/TeamsModel';

const getAll = async () => {
  const teams = await Teams.findAll();
  return teams;
};

const getOne = async (id: number): Promise<Teams> => {
  const team = await Teams.findByPk(id) as Teams;
  return team;
};

export default {
  getAll,
  getOne,
};
