import { TaskRepository } from "../../../repositories/implementations/TaskRepository";
import { AddTaskController } from "./Controller";
import { AddTaskUseCase } from "./UseCase";

const repository = new TaskRepository();
const addTaskUseCase= new AddTaskUseCase(repository);
const addTaskController = new AddTaskController(addTaskUseCase);

export {addTaskUseCase, addTaskController}