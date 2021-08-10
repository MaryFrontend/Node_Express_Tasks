import express from 'express';
import taskRouter from './tasks/tasks.controller';
import { handleError, ErrorHandler } from  './helpers/error';

export const app = express();
const jsonParser = express.json();

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200);
    res.send('<h1>Homepage</h2>');
});

app.get('/error', (req: express.Request, res: express.Response) => {
    throw new ErrorHandler(500, 'Internal server error');
});  

app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    handleError(err, res);
});

app.use('/tasks', taskRouter);


