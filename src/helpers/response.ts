import { Response } from 'express';

export const buildResponse = (response: Response, status: number, result:  Task |  Task [] | string): void => {
    response.status(status);
    response.json(result);
};