import Teams from '../database/models/TeamsModel';

const getAll = async () => {
  const teams = await Teams.findAll();
  return teams;
};

export default {
  getAll,
};
