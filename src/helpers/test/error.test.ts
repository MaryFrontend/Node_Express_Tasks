import { Response } from 'express';
import { ErrorHandler, handleError } from '../error';

describe('error.test.ts', () => {
  describe('class ErrorHandler:', () => {
    test('Checking for fields(statusCode, message): ✔', () => {
      const mockStatusCode = 404;
      const mockMessage = 'Error';
      const mockErrorHandler = new ErrorHandler(mockStatusCode, mockMessage);

      expect(mockErrorHandler.statusCode).toBe(mockStatusCode);
      expect(mockErrorHandler.message).toBe(mockMessage);
    });
  });

  describe('function handleError:', () => {
    test('Checking for fields(status, json): ✔', () => {
      const mockStatusCode = 404;
      const mockMessage = 'Error';
      const mockJSON = {
        status: 'error',
        statusCode: mockStatusCode,
        message: mockMessage,
      };
      const mockResponse = {
        status: jest.fn(() => mockStatusCode),
        json: jest.fn(() => mockJSON),
      };
      const CustomError = {
        statusCode: mockStatusCode,
        message: mockMessage,
      };

      handleError(CustomError, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockStatusCode);
      expect(mockResponse.json).toHaveBeenCalledWith(mockJSON);
    });
  });
});
