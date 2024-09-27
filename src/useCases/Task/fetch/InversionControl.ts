import { TaskRepository } from "../../../repositories/implementations/TaskRepository";
import {  FetchTaskController } from "./Controller";
import {  FetchTaskUseCase } from "./UseCase";




const repository = new TaskRepository();
const fetchTaskUC= new FetchTaskUseCase(repository);
const fetchTaskController = new FetchTaskController(fetchTaskUC);

export {fetchTaskUC, fetchTaskController}