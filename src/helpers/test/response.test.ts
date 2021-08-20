import { Response } from 'express';
import { buildResponse } from '../response';

describe('Response', () => {
  test('Success', () => {
    const mockResponse = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const mockStatus = 200;
    const mockResult = 'test';

    buildResponse(mockResponse as Response, mockStatus, mockResult);

    expect(mockResponse.status).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(mockStatus);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
  });
});
