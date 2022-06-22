import { Request, Response } from 'express';
import { DataModel } from '../models/data.model';
import { DataController } from './data.controller';

describe('Given a instantiated controller DataController', () => {
    let dataController: DataController;
    let req: Request;
    let resp: Partial<Response>;
    beforeEach(() => {
        req;
        resp = {
            setHeader: jest.fn(),
            end: jest.fn(),
        };
        // const dataModel: Partial<DataModel> = {
        //     find: jest.fn(),
        // };
        const dataModel = new DataModel('test-db');
        dataModel.findAll = jest.fn();

        dataController = new DataController(dataModel);
    });
    describe('When method getAllController is called', () => {
        test('Then resp.end should be called', async () => {
            await dataController.getAllController(req, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
});

// describe('Given a instantiated controller DataController', () => {
//     describe('When method ... is called', () => {
//         test('Then it should ...', () => {});
//     });
// });
