import { Router } from 'express';
import * as c from '../controllers/task.controller.js';

export const taskRouter = Router();

taskRouter.get('/', c.getAllController);
taskRouter.get('/:id', c.getController);
taskRouter.post('/', c.postController);
taskRouter.patch('/:id', c.patchController);
taskRouter.delete('/:id', c.deleteController);
