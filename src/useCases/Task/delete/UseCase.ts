import bcrypt from 'bcrypt'
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { ResponseModel } from '../../../util/ResponseModel';
import {  DeleTaskDTO, DeleteTaskModel } from './Dto';
import { ITaskRepository } from '../../../repositories/interfaces/ITaskRepository';

export class DeleTaskUC{

    constructor(private repository:ITaskRepository){}

    async execute(data:DeleteTaskModel){
        let typeCheck:any = DeleTaskDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.delete(typeCheck.data);
    }
}