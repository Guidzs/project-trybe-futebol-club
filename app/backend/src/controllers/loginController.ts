import { Request, Response } from 'express';
import loginService from '../services/loginService';
import { vevifyToken } from '../utils/jtw';

const login = async (req: Request, res: Response) => {
  const { body } = req;

  const token = await loginService.loginAuth(body);
  if (!token) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  return res.status(200).json(token);
};

const getRole = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400);
  }
  const { dataValues: { role } } = vevifyToken(authorization);
  return res.status(200).json({ role });
};

export default {
  login,
  getRole,
};
