import Users from '../database/models/UsersModel';
import { ILogin, IUserDb, IToken } from '../interfaces/userInterfaces';
import { validateHash } from '../utils/bcript';
import { createToken, vevifyToken } from '../utils/jtw';

const loginAuth = async (login: ILogin): Promise<IToken | null> => {
  const { email } = login;
  const user: IUserDb = await Users.findOne({ where: { email } }) as IUserDb;

  if (!user || !validateHash(login.password, user.password)) {
    return null;
  }

  const { password, ...payload } = user;
  const token = createToken(payload);
  return { token };
};


export default {
  loginAuth,
};
