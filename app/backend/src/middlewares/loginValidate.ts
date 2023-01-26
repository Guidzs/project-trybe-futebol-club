import { NextFunction, Request, Response } from 'express';
import loginSchemaRequired from '../utils/schemas';

const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    await loginSchemaRequired.validateAsync(body);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
};

export default {
  loginValidate,
};
