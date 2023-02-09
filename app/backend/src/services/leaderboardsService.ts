import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { ITeamsData, IBoard } from '../interfaces/Interfaces';

const nullBoard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
} as IBoard;

const getTeamsData = async () => {
  const matches = await Teams.findAll({
    include: [{
      model: Matches,
      where: { inProgress: false },
      as: 'homeTeam',
      attributes: { exclude: ['id', 'inProgress'] },
    },
    {
      model: Matches,
      where: { inProgress: false },
      as: 'awayTeam',
      attributes: { exclude: ['id', 'inProgress'] },
    },
    ],
  }) as unknown as ITeamsData[];
  return matches;
};

const countHomeTeam = (team: ITeamsData, board: IBoard): IBoard => {
  const newBoard = { ...board };
  team.homeTeam.forEach((t) => {
    newBoard.totalGames += 1;
    newBoard.goalsFavor += t.homeTeamGoals;
    newBoard.goalsOwn += t.awayTeamGoals;
    if (t.homeTeamGoals > t.awayTeamGoals) {
      newBoard.totalPoints += 3;
      newBoard.totalVictories += 1;
    } if (t.homeTeamGoals < t.awayTeamGoals) {
      newBoard.totalLosses += 1;
    } if (t.homeTeamGoals === t.awayTeamGoals) {
      newBoard.totalPoints += 1;
      newBoard.totalDraws += 1;
    }
  });
  return newBoard;
};

const countAwayTeam = (team: ITeamsData, board: IBoard): IBoard => {
  const newBoard = { ...board };
  team.awayTeam.forEach((t) => {
    newBoard.totalGames += 1;
    newBoard.goalsFavor += t.awayTeamGoals;
    newBoard.goalsOwn += t.homeTeamGoals;
    if (t.awayTeamGoals > t.homeTeamGoals) {
      newBoard.totalPoints += 3;
      newBoard.totalVictories += 1;
    } if (t.awayTeamGoals < t.homeTeamGoals) {
      newBoard.totalLosses += 1;
    } if (t.awayTeamGoals === t.homeTeamGoals) {
      newBoard.totalPoints += 1;
      newBoard.totalDraws += 1;
    }
  });
  return newBoard;
};

const getBoardData = (board: IBoard): IBoard => {
  const newBoard = { ...board };
  newBoard.goalsBalance = newBoard.goalsFavor - newBoard.goalsOwn;
  newBoard.efficiency = Number(
    ((
      newBoard.totalPoints / (newBoard.totalGames * 3)
    ) * 100).toFixed(2),
  );
  return newBoard;
};

const getAllLeaders = (teams: ITeamsData[]) => {
  const leaderboard = teams.map((team) => {
    const board = { ...nullBoard };
    const boardHome = countHomeTeam(team, board);
    const boardAway = countAwayTeam(team, boardHome);
    boardAway.name = team.teamName;
    // boardAway.totalDraws /= 2;
    // boardAway.totalPoints -= boardAway.totalDraws;
    const finalBoard = getBoardData(boardAway);
    return finalBoard;
  });
  return leaderboard;
};

const getHomeLeaders = (teams: ITeamsData[]) => {
  const leaderboard = teams.map((team) => {
    const board = { ...nullBoard };
    const boardHome = countHomeTeam(team, board);
    boardHome.name = team.teamName;
    const finalBoard = getBoardData(boardHome);
    return finalBoard;
  });
  return leaderboard;
};

const getAwayLeaders = (teams: ITeamsData[]) => {
  const leaderboard = teams.map((team) => {
    const board = { ...nullBoard };
    const boardAway = countAwayTeam(team, board);
    boardAway.name = team.teamName;
    const finalBoard = getBoardData(boardAway);
    return finalBoard;
  });
  return leaderboard;
};

const verifyPath = (path: string, teams: ITeamsData[]) => {
  if (path === '/home') {
    return getHomeLeaders(teams);
  } if (path === '/away') {
    return getAwayLeaders(teams);
  }
  return getAllLeaders(teams);
};

const getLeaders = async (path: string) => {
  const teams = await getTeamsData();
  const leaderboard = verifyPath(path, teams);

  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);
  return leaderboard;
};

export default {
  getLeaders,
};
