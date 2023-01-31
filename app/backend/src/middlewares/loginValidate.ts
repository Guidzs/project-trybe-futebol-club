import { NextFunction, Request, Response } from 'express';
import loginSchemaRequired from '../utils/schemas';

const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  try {
    await loginSchemaRequired.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
};

export default {
  loginValidate,
};
