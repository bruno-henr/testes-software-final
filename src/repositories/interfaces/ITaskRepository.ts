import { AddTaskModel } from "../../useCases/Task/add/Dto";
import { DeleteTaskModel } from "../../useCases/Task/delete/Dto";
import { FetchTaskModel } from "../../useCases/Task/fetch/Dto";
import { ResponseModel } from "../../util/ResponseModel";

export interface ITaskRepository {
    add(data: AddTaskModel): Promise<ResponseModel>
    fetch(data: FetchTaskModel): Promise<ResponseModel>
    delete(data: DeleteTaskModel): Promise<ResponseModel>
}