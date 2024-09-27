import bcrypt from 'bcrypt'
import { IUserRepository } from '../../../repositories/interfaces/IUserRepository';
import { AddUserDTO, AddUserModel } from './Dto';
import { ResponseModel } from '../../../util/ResponseModel';

export class AddUserUseCase{

    constructor(private repository:IUserRepository){}

    async execute(data:AddUserModel){
        let typeCheck:any = AddUserDTO.safeParse(data)
        console.log('typeCheck => ', typeCheck)
        if(!typeCheck.success) return new ResponseModel("Erro de validação.", true,typeCheck.error.errors );
        typeCheck.data.password = await bcrypt.hash(typeCheck.data.password, 12)
        return await this.repository.add(typeCheck.data);
    }
}