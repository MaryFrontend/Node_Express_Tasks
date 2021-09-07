import { Response, Request, NextFunction } from 'express';
import { buildResponse } from '../helpers/response';
import jwt from 'jsonwebtoken';
import config from '../auth/secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'GET') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      buildResponse(res, 200, 'User is not logged in');
    }
    const decodedData = jwt.verify(token, config.secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    buildResponse(res, 200, 'User is not logged in');
  }
};
