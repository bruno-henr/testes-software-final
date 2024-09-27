import bcrypt from 'bcrypt'
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { ResponseModel } from '../../../util/ResponseModel';
import { AddTaskDTO, AddTaskModel } from './Dto';
import { ITaskRepository } from '../../../repositories/interfaces/ITaskRepository';

export class AddTaskUseCase {
    constructor(private repository: ITaskRepository) { }

    async execute(data: AddTaskModel) {
        let typeCheck: any = AddTaskDTO.safeParse(data)
        if (!typeCheck.success) return await new ResponseModel("Erro de validação.", true, typeCheck.error.errors);
        return await this.repository.add(typeCheck.data);
    }
}