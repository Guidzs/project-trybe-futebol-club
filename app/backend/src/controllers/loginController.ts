import { Request, Response } from 'express';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response) => {
  const { body } = req;

  const token = await loginService.login(body);
  if (!token) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  return res.status(200).json(token);
}

export default {
  login,
};