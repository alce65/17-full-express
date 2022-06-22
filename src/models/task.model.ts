import { Connector } from '../bin/connector.js';

/* eslint-disable no-unused-vars */
export interface iTask {
    id: number;
    title: string;
    responsible: string;
    isCompleted: boolean;
}

export class Task extends Connector<iTask> implements iTask {
    id: number;
    constructor(
        public title: string = '',
        public responsible: string = '',
        public isCompleted: boolean = false
    ) {
        super('task-db');
        this.id = 0;
    }
}
