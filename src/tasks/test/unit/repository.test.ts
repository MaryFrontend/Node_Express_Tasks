import { Pool } from 'pg';
import { schema } from '../../../database';
import { getAll, getById, createOne, updateOne, deleteOne } from '../../repository';

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

jest.mock('pg', () => {
  const mockPool = {
    connect: jest.fn(() => mockClient),
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mockPool) };
});

describe('Repository:', () => {
  let pool;
  beforeEach(() => {
    pool = new Pool();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('getAll', () => {
    test('Success', async () => {
      pool.query.mockResolvedValue({ rows: [], rowCount: 0 });

      const expected = await getAll();

      expect(pool.query).toBeCalledWith(`SELECT * FROM ${schema}.task`);
      expect(expected).toEqual([]);
    });
    test('Failure', async () => {
      pool.query.mockRejectedValue(new Error('test Error'));

      let expected;

      try {
        expected = await getAll();
      } catch (error) {}

      expect(expected).toBe(null);
    });
  });

  describe('getById', () => {
    test('Success', async () => {
      pool.query.mockResolvedValue({ rows: [{}], rowCount: 0 });

      const expected = await getById(1);

      expect(pool.query).toBeCalledWith(`SELECT * FROM ${schema}.task WHERE id = $1`, [1]);
      expect(expected).toEqual({});
    });
    test('Failure', async () => {
      pool.query.mockRejectedValue(new Error('test Error'));

      let expected;

      try {
        expected = await getById(1);
      } catch (error) {}

      expect(expected).toBe(null);
    });
  });

  describe('createOne', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Success', async () => {
      mockClient.query.mockResolvedValueOnce({});
      mockClient.query.mockResolvedValueOnce({ rows: [], rowCount: 1 });

      const mockTask = { id: 1, title: 'MySQL', description: 'SQL' };
      const expectedResult = await createOne(mockTask);

      expect(mockClient.query).toBeCalledWith('BEGIN');
      expect(mockClient.query).toBeCalledWith(`INSERT INTO ${schema}.task (title, description) VALUES ($1, $2)`, ['MySQL', 'SQL']);
      expect(mockClient.query).toBeCalledWith('COMMIT');
      expect(mockClient.release).toBeCalled();
      expect(expectedResult).toEqual(mockTask);
    });
    test('Failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('test Error'));

      let expected;

      try {
        expected = await createOne({ id: 1, title: 'MySQL', description: 'SQL' });
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
    test('Error: rowCount = 0', async () => {
      mockClient.query.mockResolvedValue({ rows: [], rowCount: 0 });

      let expected;

      try {
        expected = await createOne({ id: 1, title: 'MySQL', description: 'SQL' });
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
  });

  describe('updateOne', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Success', async () => {
      mockClient.query.mockResolvedValue({ rows: [], rowCount: 1 });

      const mockTask = { id: 1, title: 'MySQL', description: 'SQL' };
      const expectedResult = await updateOne(1, mockTask);

      expect(mockClient.query).toBeCalledWith('BEGIN');
      expect(mockClient.query).toBeCalledWith(`UPDATE  ${schema}.task SET title = $1, description = $2 WHERE id = ${1}`, ['MySQL', 'SQL']);
      expect(mockClient.query).toBeCalledWith('COMMIT');
      expect(mockClient.release).toBeCalled();
      expect(expectedResult).toEqual(mockTask);
    });
    test('Failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('test Error'));

      let expected;

      try {
        expected = await updateOne(1, { id: 1, title: 'MySQL', description: 'SQL' });
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
    test('Error: rowCount = 0', async () => {
      mockClient.query.mockResolvedValue({ rows: [], rowCount: 0 });

      let expected;

      try {
        expected = await updateOne(1, { id: 1, title: 'MySQL', description: 'SQL' });
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
  });

  describe('deleteOne', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Success', async () => {
      mockClient.query.mockResolvedValue({ rows: [], rowCount: 1 });

      const id = 1;
      const expectedResult = await deleteOne(id);

      expect(mockClient.query).toBeCalledWith('BEGIN');
      expect(mockClient.query).toBeCalledWith(`DELETE FROM ${schema}.task WHERE id = $1`, [1]);
      expect(mockClient.query).toBeCalledWith('COMMIT');
      expect(mockClient.release).toBeCalled();
      expect(expectedResult).toEqual(id);
    });
    test('Failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('test Error'));

      let expected;

      try {
        expected = await deleteOne(1);
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
    test('Error: rowCount = 0', async () => {
      mockClient.query.mockResolvedValue({ rows: [], rowCount: 0 });

      let expected;

      try {
        expected = await deleteOne(1);
      } catch (error) {}

      expect(mockClient.release).toBeCalled();
      expect(expected).toBe(null);
    });
  });
});
