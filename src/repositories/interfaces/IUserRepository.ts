import { AddUserModel } from "../../useCases/User/add/Dto";
import { LoginUserModel } from "../../useCases/User/login/Dto";
import { ResponseModel } from "../../util/ResponseModel";

export interface IUserRepository {
    add(data: AddUserModel): Promise<ResponseModel>
    login(data: LoginUserModel): Promise<ResponseModel>
}