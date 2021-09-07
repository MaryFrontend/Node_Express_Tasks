import bcrypt from 'bcrypt';
import express, { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { signup, search } from './auth.service';
import config from './secret';

export const apiRouter = express.Router();

apiRouter.post('/auth/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const candidate = await search(username);
    if (!candidate) {
      buildResponse(res, 404, 'Failed! Username is already in use!');
    }
    const user = req.body;
    await signup(user);
    buildResponse(res, 200, 'User was registered successfully!');
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
    const user = await search(username);

    if (!user) {
      buildResponse(res, 404, 'No user found');
    }

    const passwordIsValid = (user, password) => bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = (user) =>
      jwt.sing({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});
