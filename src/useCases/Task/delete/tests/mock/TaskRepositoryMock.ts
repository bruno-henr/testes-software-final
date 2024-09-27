import { ITaskRepository } from "../../../../../repositories/interfaces/ITaskRepository";
import { ResponseModel } from "../../../../../util/ResponseModel";
import { DeleteTaskModel } from "../../../delete/Dto";
import { FetchTaskModel } from "../../../fetch/Dto";

export interface AddTaskModel {
    id?: string; // O id pode ser opcional na criação
    name: string;
    desc: string;
    data: string; // Formato dd/mm/yyyy
    userId: string;
}

export class TaskRepositoryMock implements ITaskRepository {
    tasks: AddTaskModel[] = [];
    
    async fetch(data: FetchTaskModel): Promise<ResponseModel> {
        throw new Error("Method not implemented.");
    }
    
    async delete(data: DeleteTaskModel): Promise<ResponseModel> {
        const taskIndex = this.tasks.findIndex(task => task.id === data.taskId);
        if (taskIndex === -1) {
            return new ResponseModel("Tarefa não encontrada.", true);
        }
        this.tasks.splice(taskIndex, 1);
        return new ResponseModel("Tarefa removida com sucesso!", false);
    }
    
    async add(data: AddTaskModel): Promise<ResponseModel> {
        const requiredFields = ['name', 'desc', 'data', 'userId'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return new ResponseModel(`O campo ${field} é obrigatório.`, true);
            }
        }

        const newId = this.generateId();
        const taskToAdd: AddTaskModel = { ...data, id: newId };
        
        this.tasks.push(taskToAdd);
        return new ResponseModel("Tarefa cadastrada com sucesso!", false);
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9); // Gera um ID aleatório
    }
}