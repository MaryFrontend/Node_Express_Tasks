import express, { Response, Request } from 'express';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { signup, login } from './auth.service';

export const apiRouter = express.Router();

apiRouter.post('/auth/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await login(username);
    const user = req.body;
    await signup(user);
    buildResponse(res, 200, 'User registered successfully!');
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    await login(username);

    buildResponse(res, 200, 'User logged in successfully!');
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});
