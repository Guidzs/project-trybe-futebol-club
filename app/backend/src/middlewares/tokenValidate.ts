import { Request, Response, NextFunction } from 'express';
import { vevifyToken } from '../utils/jtw';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    vevifyToken(`${authorization}`);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
