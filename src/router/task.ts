import { Router } from 'express';
import { Task } from '../models/task.model.js';
import { DataController } from '../controllers/data.controller.js';

export const taskController = new DataController(new Task());
export const taskRouter = Router();

taskRouter.get('/', taskController.getAllController);
taskRouter.get('/:id', taskController.getController);
taskRouter.post('/', taskController.postController);
taskRouter.patch('/:id', taskController.patchController);
taskRouter.delete('/:id', taskController.deleteController);
