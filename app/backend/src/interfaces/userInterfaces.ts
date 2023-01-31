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

export interface ITokenReturn {
  dataValues: IPayload,
}

export interface IUserDb {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IToken {
  token: string,
}
