/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response, Request } from 'express';
import { handleError, ErrorHandler } from './helpers/error';
import { taskRouter } from './tasks/tasks.controller';
import { apiRouter } from '../app/auth.controller';
import jwt from 'jsonwebtoken';
export const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200);
  res.send('<h1>Homepage</h2>');
});

app.get('/error', (_req: Request, _res: Response) => {
  throw new ErrorHandler(500, 'Internal server error');
});

app.use('/tasks', taskRouter);
app.use('/api', apiRouter);
app.use(jwt({secret: 'shared-secret'}))

app.use((err, _req: Request, res: Response, _next: express.NextFunction) => {
  handleError(err, res);
});