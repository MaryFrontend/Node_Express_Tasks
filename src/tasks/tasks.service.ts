import { ErrorHandler } from '../helpers/error';
import { getAll, getById, createOne, updateOne, deleteOne } from './repository';

const getTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await getAll();
    if (!tasks) {
      throw new ErrorHandler(404, 'Tasks did not found');
    }
    return tasks;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (id: number): Promise<Task> => {
  try {
    const task = await getById(id);
    if (!task) {
      throw new ErrorHandler(404, 'Task did not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

const createTask = async (task: Task): Promise<Task> => {
  try {
    const create = await createOne(task);
    if (!create) {
      throw new ErrorHandler(404, 'Task did not found');
    }
    return create;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id: number, task: Task): Promise<Task> => {
  try {
    const update = await updateOne(id, task);
    if (!update) {
      throw new ErrorHandler(404, 'Task did not found');
    }
    return update;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id: number): Promise<number> => {
  try {
    const task = await deleteOne(id);
    if (!task) {
      throw new ErrorHandler(404, 'Task did not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
