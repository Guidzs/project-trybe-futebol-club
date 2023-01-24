import { NextFunction, Request, Response } from 'express';
import loginSchemaRequired from '../utils/schemas';


export const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    await loginSchemaRequired.validateAsync(body);
    next();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
