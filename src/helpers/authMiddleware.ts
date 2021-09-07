import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../auth/secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'User is not logged in' });
    }
    const decodedData = jwt.verify(token, config.secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'User is not logged in' });
  }
};