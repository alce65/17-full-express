/* eslint-disable no-unused-vars */
import { mongoConnect } from '../db/mongo.js';
import { Notes } from './notes.model';

jest.mock('../db/mongo.js');

describe('Given a instantiated model Notes', () => {
    let model: Notes;
    // let result: string;
    let mockItem = { id: 1, test: 'test' };
    const mockFind = jest.fn();

    beforeEach(() => {
        // result = JSON.stringify([mockItem]) as string;
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: jest.fn() },
            collection: {
                find: mockFind,
            },
        });
        model = new Notes('test-db');
    });

    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFind).toHaveBeenCalled();
        });
    });

    describe('When method find is called', () => {
        test('Then an item should be found', async () => {
            // const result = await model.find('1');
            // expect(fs.readFile).toHaveBeenCalled();
            // expect(result).toStrictEqual(mockItem);
        });
    });

    describe('When method create is called', () => {
        test('Then an item should be created', async () => {
            // const result = await model.create(mockItem);
            // expect(fs.writeFile).toHaveBeenCalled();
            // expect(result).toStrictEqual({ ...mockItem, id: mockItem.id + 1 });
        });
    });

    describe('When method update is called', () => {
        test('Then an item should be updated', async () => {
            // const updatedPartial = { test: 'newTest' };
            //const result = await model.update('1', updatedPartial);
            // expect(fs.writeFile).toHaveBeenCalled();
            // expect(result.test).toBe(updatedPartial.test);
        });
    });

    describe('When method delete is called with a valid id', () => {
        test('Then an item should be  deleted', async () => {
            // const result = await model.delete('1');
            // expect(result.status).toBe(202);
        });
    });

    describe('When method delete is called with a not valid id', () => {
        test('Then an item should not be  deleted', async () => {
            // const result = await model.delete('4');
            // expect(result.status).toBe(404);
        });
    });
});
