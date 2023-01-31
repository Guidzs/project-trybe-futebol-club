import * as jwt from 'jsonwebtoken';
import { IPayload, ITokenReturn } from '../interfaces/Interfaces';

const SECRET = process.env.JWT_SECRET as string;
const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '10h',
} as jwt.SignOptions;

export const createToken = (user: IPayload) => jwt.sign(user, SECRET, JWT_CONFIG);

export const vevifyToken = (token: string) => jwt.verify(token, SECRET) as ITokenReturn;
