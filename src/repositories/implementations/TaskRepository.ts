import { prisma } from "../../Database";
import { AddTaskModel } from "../../useCases/Task/add/Dto";
import { DeleteTaskModel } from "../../useCases/Task/delete/Dto";
import { FetchTaskModel } from "../../useCases/Task/fetch/Dto";
import { ResponseModel } from "../../util/ResponseModel";
import { ITaskRepository } from "../interfaces/ITaskRepository";

export class TaskRepository implements ITaskRepository {
    async delete(data: DeleteTaskModel): Promise<ResponseModel> {
        try {
            await prisma.task.delete({
                where: {
                    id: data.taskId
                }
            })
            return new ResponseModel("Tarefa removida", false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao remover a tarefa.", true)
        }
    }
    async fetch(data: FetchTaskModel): Promise<ResponseModel> {
        try {
            let tasks = await prisma.task.findMany({
                where: {
                    userId: data.userId
                }
            })
            return new ResponseModel(tasks, false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao listar as tarefas", true)
        }
    }
    async add(params: AddTaskModel): Promise<ResponseModel> {
        try {
            await prisma.task.create({
                data: {
                    name: params.name,
                    description: params.desc,
                    expiresIn: params.data,
                    status: true,
                    userId: params.userId
                }
            })
            return new ResponseModel("Tarefa criada.", false)
        } catch (error) {
            return new ResponseModel("Houve um erro ao criar a tarefa.", true)
        }
    }

}