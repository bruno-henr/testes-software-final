import { ITaskRepository } from "../../../../../repositories/interfaces/ITaskRepository";
import { ResponseModel } from "../../../../../util/ResponseModel";
import { DeleteTaskModel } from "../../../delete/Dto";
import { FetchTaskModel } from "../../../fetch/Dto";
import { AddTaskModel } from "../../Dto";

export class TaskRepositoryMock implements ITaskRepository {
    fetch(data: FetchTaskModel): Promise<ResponseModel> {
        throw new Error("Method not implemented.");
    }
    delete(data: DeleteTaskModel): Promise<ResponseModel> {
        throw new Error("Method not implemented.");
    }
    tasks: AddTaskModel[] = [];
    
    async add(data: AddTaskModel): Promise<ResponseModel> {
        const requiredFields = ['name', 'desc', 'data', 'userId'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return new ResponseModel(`O campo ${field} é obrigatório.`, true);
            }
        }
        
        const taskExists = this.tasks.some(task => task.name === data.name && task.userId === data.userId);
        if (taskExists) {
            return new ResponseModel("Já existe uma tarefa com esse nome para este usuário.", true);
        }

        this.tasks.push(data);
        return new ResponseModel("Tarefa cadastrada com sucesso!", false);
    }
}