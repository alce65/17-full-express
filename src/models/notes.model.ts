/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import { mongoConnect } from '../db/mongo.js';
import { DataModel } from './data.model.js';

export interface iNotes {
    id: number;
    author: string;
    content: string;
    isImportant: boolean;
}

export class Notes extends DataModel<iNotes> implements iNotes {
    id: number;
    constructor(
        public author: string = '',
        public content: string = '',
        public isImportant: boolean = false
    ) {
        super('task-db');
        this.id = 0;
    }

    async findAll() {
        const { connect, collection } = await mongoConnect<iNotes>(
            'ISDI20225',
            'notes'
        );
        const result = await collection.find().toArray();
        connect.close();
        return result;
    }

    async find(id: string) {
        console.log(id);
        const { connect, collection } = await mongoConnect<iNotes>(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = await collection.findOne({
            _id: dbId,
        });
        if (result === null) return undefined;
        connect.close();
        return result;
    }
    async create(data: Partial<iNotes>) {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const result = (await collection.insertOne(
            data
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }
    async update(id: string, data: Partial<iNotes>) {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }

    async delete(id: string) {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });
        connect.close();
        console.log(result);
        if (!result.value) return { status: 404 };
        return { status: 202 };
    }
}
