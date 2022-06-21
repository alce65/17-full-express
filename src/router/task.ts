import { Router } from 'express';
import { getController } from '../controllers/task.controller';

export const taskRouter = Router();

let tasks: Array<any> = [];
taskRouter.get('/', getController);

taskRouter.get('/:id', (req, resp) => {
    resp.setHeader('Content-type', 'application/json');
    const result = tasks.find((task) => task.id === +req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
});
taskRouter.post('/', (req, resp) => {
    const newTask = { ...req.body, id: tasks[tasks.length - 1].id + 1 };
    tasks.push(newTask);
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newTask));
});

taskRouter.patch('/:id', (req, resp) => {
    let newTask;
    tasks = tasks.map((task) => {
        if (task.id === +req.params.id) {
            newTask = { ...task, ...req.body };
            return newTask;
        } else {
            return task;
        }
    });
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newTask));
});

taskRouter.delete('/:id', (req, resp) => {
    const prevLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== +req.params.id);
    resp.status(prevLength === tasks.length ? 404 : 202);
    resp.end(JSON.stringify({}));
});
