import { TaskRepository } from "../../../repositories/implementations/TaskRepository";
import {  DeleteTaskController } from "./Controller";
import {  DeleTaskUC } from "./UseCase";




const repository = new TaskRepository();
const deleteTaskUc= new DeleTaskUC(repository);
const deleteTaskController = new DeleteTaskController(deleteTaskUc);

export {deleteTaskUc, deleteTaskController}