import bcrypt from 'bcrypt'
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { ResponseModel } from '../../../util/ResponseModel';
import {  FetchTaskDTO, FetchTaskModel } from './Dto';
import { ITaskRepository } from '../../../repositories/interfaces/ITaskRepository';

export class FetchTaskUseCase{

    constructor(private repository:ITaskRepository){}

    async execute(data:FetchTaskModel){
        let typeCheck:any = FetchTaskDTO.safeParse(data)
        if(!typeCheck.success) return await new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        return await this.repository.fetch(typeCheck.data);
    }
}