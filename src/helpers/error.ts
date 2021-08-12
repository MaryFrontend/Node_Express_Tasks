import { Response } from 'express';

class ErrorHandler extends Error {
  readonly statusCode: number;
  readonly message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorHandler.prototype);
    this.statusCode = statusCode;
  }
}

interface CustomError {
  statusCode: number;
  message: string;
}

const handleError = (err: CustomError, res: Response): void => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
