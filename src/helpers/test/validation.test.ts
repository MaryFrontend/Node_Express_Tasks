import { Response, Request, NextFunction } from 'express';
import { validateTask } from '../validation';

describe('validateTask', () => {
  const mockResponse = {} as Response;
  const mockNext = jest.fn() as NextFunction;
  test('Valid data', () => {
    const mockTitle = 'title';
    const mockDescription = 'description';
    const mockRequest = {
      body: {
        title: mockTitle,
        description: mockDescription,
      },
    } as Request;

    validateTask(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('Invalid data', () => {
    const mockRequest = {
      body: {},
    } as Request;
    let expectedError;

    try {
      validateTask(mockRequest, mockResponse, mockNext);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError.statusCode).toBe(404);
    expect(expectedError.message).toBe('Invalid req data');
  });
  test('Invalid body', () => {
    const mockRequest = {} as Request;
    let expectedError;

    try {
      validateTask(mockRequest, mockResponse, mockNext);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError.statusCode).toBe(404);
    expect(expectedError.message).toBe('Invalid req data');
  });
});
