import { Request, Response } from 'express';
import { DataModel } from '../models/data.model';
import { DataController } from './data.controller';

describe('Given a instantiated controller DataController', () => {
    let dataController: DataController;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let dataModel: DataModel<any>;
    beforeEach(() => {
        req = {
            params: { id: '1' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
        // const dataModel: Partial<DataModel> = {
        //     find: jest.fn(),
        // };
        dataModel = new DataModel('test-db');
        dataController = new DataController(dataModel);
    });
    describe('When method getAllController is called', () => {
        test('Then resp.end should be called', async () => {
            dataModel.findAll = jest.fn();
            await dataController.getAllController(
                req as Request,
                resp as Response
            );
            expect(resp.end).toHaveBeenCalled();
        });
    });

    describe('When method getController is called', () => {
        test('And response is ok, then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            dataModel.find = jest.fn().mockResolvedValue(result);
            await dataController.getController(
                req as Request,
                resp as Response
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(result));
        });
        test('And response is not ok, then resp.end should be called without data', async () => {
            const result = null;
            dataModel.find = jest.fn().mockResolvedValue(result);
            await dataController.getController(
                req as Request,
                resp as Response
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});

// describe('Given a instantiated controller DataController', () => {
//     describe('When method ... is called', () => {
//         test('Then it should ...', () => {});
//     });
// });
