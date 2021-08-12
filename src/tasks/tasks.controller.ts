import express, { Response, Request } from 'express';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { validateTask } from '../helpers/validation';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from './tasks.service';

export const taskRouter = express.Router();

taskRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    buildResponse(res, 200, tasks);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

taskRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    buildResponse(res, 200, task);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

taskRouter.post('/', validateTask, async (req: Request, res: Response) => {
  try {
    const task = req.body;
    const create = await createTask(task);
    console.log('create', create);
    buildResponse(res, 201, create);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

taskRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = req.body;
    const update = await updateTask(id, task);
    buildResponse(res, 200, update);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});

taskRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteTask(parseInt(id));
    buildResponse(res, 204, `Task with id: ${id} deleted successful`);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
    buildResponse(res, 500, 'Something get wrong');
  }
});
