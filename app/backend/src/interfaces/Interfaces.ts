// User Interfaces ==============================
export interface ILogin {
  email: string,
  password: string,
}

export interface IPayload {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface IUserDb {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

// Token Interfaces ==============================
export interface IToken {
  token: string,
}

export interface ITokenReturn {
  dataValues: IPayload,
}

// Matches Interfaces ==============================
export interface IMatches {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}
