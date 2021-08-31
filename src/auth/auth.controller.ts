import express, { Response, Request } from 'express';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { createUser } from './auth.service';

export const authRouter = express.Router();

authRouter.post('/registration', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const create = await createUser(user);
    buildResponse(res, 201, create);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
  });