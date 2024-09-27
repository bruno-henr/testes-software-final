import { prisma } from "../../Database";
import { AddUserModel } from "../../useCases/User/add/Dto";
import { LoginUserModel } from "../../useCases/User/login/Dto";
import { ResponseModel } from "../../util/ResponseModel";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
    async login(data: LoginUserModel): Promise<ResponseModel> {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });

            // Verifica se o usuário foi encontrado
            if (!result) {
                return new ResponseModel("Usuário não encontrado", true);
            }

            return new ResponseModel(result, false);

        } catch (error) {
            return new ResponseModel("Erro ao fazer login", true);
        }
    }
    async add(data: AddUserModel): Promise<ResponseModel> {
        try {
            await prisma.user.create({
                data: {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    password: data.password
                }
            })

            return await new ResponseModel("Usuário cadastrado!", false);
        } catch (error) {
            return await new ResponseModel("Houve um erro ao cadastrar o usuário", true);
        }
    }

}