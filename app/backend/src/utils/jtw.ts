import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/userInterfaces';

const SECRET = process.env.JWT_SECRET as string;
const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '5min',
} as jwt.SignOptions;

export const createToken = (user: IPayload) => jwt.sign(user, SECRET, JWT_CONFIG);

export const vevifyToken = (token: string) => jwt.verify(token, SECRET) as IPayload;
