import { Router } from 'express';
import { Book } from '../models/books.model.js';
import { MongooseController } from '../controllers/mongoose.controller.js';

export const bookController = new MongooseController(Book);
export const bookRouter = Router();

bookRouter.get('/', bookController.getAllController);
bookRouter.get('/:id', bookController.getController);
bookRouter.post('/', bookController.postController);
bookRouter.patch('/:id', bookController.patchController);
bookRouter.delete('/:id', bookController.deleteController);
