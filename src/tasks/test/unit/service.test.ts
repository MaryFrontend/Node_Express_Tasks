import { ErrorHandler } from '../../../helpers/error';
import * as Repository from '../../repository';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../../tasks.service';

describe('tasks.service: getTasks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getAllSpy = jest.spyOn(Repository, 'getAll');
  test('return all tasks', async () => {
    const mockTasks = [
      { id: 1, title: 'PostgreSQL', description: 'NoSQL' },
      { id: 2, title: 'MySQL', description: 'SQL' },
    ];
    getAllSpy.mockImplementation(() => {
      return Promise.resolve(mockTasks);
    });
    const expectedTasks = await getTasks();
    expect(getAllSpy).toHaveBeenCalled();
    expect(expectedTasks).toEqual(mockTasks);
  });
  test('return: Not Found', async () => {
    const mockTasks = null;
    const expected = 'Tasks did not found';
    getAllSpy.mockImplementation(() => {
      return Promise.resolve(mockTasks);
    });
    let expectedError: ErrorHandler;
    try {
      await getTasks();
    } catch (error) {
      expectedError = error;
    }
    expect(getAllSpy).toHaveBeenCalled();
    expect(expectedError.message).toEqual(expected);
  });
  test('return Error', async () => {
    const mockError = new Error('test Error');
    getAllSpy.mockImplementation(() => {
      return Promise.reject(mockError);
    });
    let expectedError: any;
    try {
      await getTasks();
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toBe(mockError.message);
  });
});

describe('tasks.service: getTaskById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const getByIdSpy = jest.spyOn(Repository, 'getById');
  test('retutn one task, used ID', async () => {
    const mockTask = { id: 1, title: 'MySQL', description: 'SQL' };
    getByIdSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    const expectedTask = await getTaskById(1);
    expect(getByIdSpy).toHaveBeenCalled();
    expect(expectedTask).toEqual(mockTask);
  });
  test('return: Not Found', async () => {
    const mockTask = null;
    const expected = 'Task did not found';
    getByIdSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    let expectedError: ErrorHandler;
    try {
      await getTaskById(2);
    } catch (error) {
      expectedError = error;
    }
    expect(getByIdSpy).toHaveBeenCalled();
    expect(expectedError.message).toEqual(expected);
  });
  test('return: Server Error', async () => {
    const mockError = new Error('Server Error');
    getByIdSpy.mockImplementation(() => {
      return Promise.reject(mockError);
    });
    let expectedError: any;
    try {
      await getTaskById(1);
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toBe(mockError.message);
  });
});

describe('tasks.service: createTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const createOneSpy = jest.spyOn(Repository, 'createOne');
  test('return new task', async () => {
    const mockTask = { id: 5, title: 'MySQL', description: 'SQL' };
    createOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    const expectedTask = await createTask({ id: 5, title: 'MySQL', description: 'SQL' });
    expect(createOneSpy).toHaveBeenCalled();
    expect(expectedTask).toEqual(mockTask);
  });
  test('return: Not Found', async () => {
    const mockTask = null;
    const expected = 'Task did not found';
    createOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    let expectedError: ErrorHandler;
    try {
      await createTask({ id: 5, title: 'MySQL', description: 'SQL' });
    } catch (error) {
      expectedError = error;
    }
    expect(createOneSpy).toHaveBeenCalled();
    expect(expectedError.message).toEqual(expected);
  });
  test('return: Server Error', async () => {
    const mockError = new Error('Server Error');
    createOneSpy.mockImplementation(() => {
      return Promise.reject(mockError);
    });
    let expectedError: any;
    try {
      await createTask({ id: 5, title: 'MySQL', description: 'SQL' });
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toBe(mockError.message);
  });
});

describe('tasks.service: updateTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const updateOneSpy = jest.spyOn(Repository, 'updateOne');
  test('return updated task', async () => {
    const mockTask = { id: 1, title: 'MySQL', description: 'SQL' };
    updateOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    const expectedTask = await updateTask(1, { id: 1, title: 'new MySQL', description: 'new SQL' });
    expect(updateOneSpy).toHaveBeenCalled();
    expect(expectedTask).toEqual(mockTask);
  });
  test('return: Not Found', async () => {
    const mockTask = null;
    const expected = 'Task did not found';
    updateOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    let expectedError: ErrorHandler;
    try {
      await updateTask(5, { id: 5, title: 'new MySQL', description: 'new SQL' });
    } catch (error) {
      expectedError = error;
    }
    expect(updateOneSpy).toHaveBeenCalled();
    expect(expectedError.message).toEqual(expected);
  });
  test('return: Server Error', async () => {
    const mockError = new Error('Server Error');
    updateOneSpy.mockImplementation(() => {
      return Promise.reject(mockError);
    });
    let expectedError: any;
    try {
      await updateTask(5, { id: 5, title: 'MySQL', description: 'SQL' });
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toBe(mockError.message);
  });
});

describe('tasks.service: deleteTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const deleteOneSpy = jest.spyOn(Repository, 'deleteOne');
  test('return deleted task', async () => {
    const mockTask = 1;
    deleteOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    const expectedTask = await deleteTask(1);
    expect(deleteOneSpy).toHaveBeenCalled();
    expect(expectedTask).toEqual(mockTask);
  });
  test('return: Not Found', async () => {
    const mockTask = null;
    const expected = 'Task did not found';
    deleteOneSpy.mockImplementation(() => {
      return Promise.resolve(mockTask);
    });
    let expectedError: ErrorHandler;
    try {
      await deleteTask(2);
    } catch (error) {
      expectedError = error;
    }
    expect(deleteOneSpy).toHaveBeenCalled();
    expect(expectedError.message).toEqual(expected);
  });
  test('return: Server Error', async () => {
    const mockError = new Error('Server Error');
    deleteOneSpy.mockImplementation(() => {
      return Promise.reject(mockError);
    });
    let expectedError: any;
    try {
      await deleteTask(2);
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toBe(mockError.message);
  });
});
