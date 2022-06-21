import { Request, Response } from 'express';

const tasks: Array<any> = [];

export const getController = (req: Request, resp: Response) => {
    req;
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(tasks));
};
