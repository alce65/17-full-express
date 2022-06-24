/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { findAll } from '../models/books.model.js';

export class MongooseController<T> {
    constructor(public model: Model<T>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(await findAll());
    };

    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        console.log(req.params.id);
        const result = await this.model.findById(req.params.id);
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const newItem = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };

    patchController = async (req: Request, resp: Response) => {
        const newItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(newItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        // resp.status(status);
        resp.end(JSON.stringify(deleteItem));
    };
}
