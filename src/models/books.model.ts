import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

// const connect =
await mongooseConnect();
// connect.disconnect()

/* eslint-disable no-unused-vars */
export interface iBook {
    id: string;
    title: string;
    author: string;
    isRead: boolean;
}

const bookSchema = new mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    author: mongoose.SchemaTypes.String,
    isRead: { type: mongoose.SchemaTypes.Boolean, default: false },
});

export const Book = mongoose.model('Book', bookSchema);

export const findAll = async () => {
    return JSON.stringify(await Book.find());
};
