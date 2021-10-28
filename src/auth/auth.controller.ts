import express, { Response, Request } from 'express';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { signup, login } from './auth.service';

export const authRouter = express.Router();

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
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

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    await login(username);
    await login(password);
    buildResponse(res, 200, 'User logged in successfully!');
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

