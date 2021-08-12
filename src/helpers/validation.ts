import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../helpers/error';

export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description } = req.body;
  if (!title || title === null || !description || description === null) {
    throw new ErrorHandler(404, 'Invalid req data');
  }
  next();
};
