import Users from '../database/models/UsersModel';
import { ILogin, IUserDb, IToken } from '../interfaces/userInterfaces';
import { validateHash } from '../utils/bcript';
import { createToken } from '../utils/jtw';

const login = async (login: ILogin): Promise<IToken | null> => {
  const { email } = login;
  const user: IUserDb | null = await Users.findOne({ where: { email } });

  if (!user || !validateHash(user.password, login.password)) {
    return null;
  }

  const { password, ...payload } = user;
  const token = createToken(payload);
  return { token };
}

export default {
  login,
};