import express, { Response, Request } from 'express';
// import { compareSync } from 'bcryptjs';
import { signup, search } from './auth.service';
import { buildResponse } from '../src/helpers/response';
import { ErrorHandler, handleError } from '../src/helpers/error';
// import { generateAccessToken } from '../src/helpers/generateToken';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
// import { config } from 'dotenv';
// import config from '../app/secret';

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
  const user = await search(username);
  if ( !user || password !== user.password) {
    buildResponse(res, 200, 'Incorrect login or password');
  }
  const refreshToken = uuidv4();
  req.body = {
    token: jwt.signup({ username: username}, 'shared-secret'),//config.secret
    refreshToken,
  }
});



  // try {
  //     
  //     if (user) {
  //       buildResponse(res, 200, `User ${username} is not found`);
  //     }
  //     // const validPassword = bcrypt.compareSync(password, user.password);
  //     // if(!validPassword) {
  //     //   buildResponse(res, 200, 'Incorrect password');
  //     // }
  //     const token = generateAccessToken(username);
  //     return res.json({token});
  // } catch (error) {
  //   if (error instanceof ErrorHandler) {
  //     handleError(error, res);
  //   }
  //   buildResponse(res, 500, 'Something get wrong');
  // }



  