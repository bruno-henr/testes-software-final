import { beforeAll, expect, describe, test } from "vitest";
import { DeleTaskUC } from "../UseCase"; // Ajuste o caminho conforme necessário
import { AddTaskModel, TaskRepositoryMock } from "./mock/TaskRepositoryMock";

let deleteTaskUC: DeleTaskUC;
let taskRepositoryMock: TaskRepositoryMock;
let TaskSaved
beforeAll(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    deleteTaskUC = new DeleTaskUC(taskRepositoryMock);
    
    // Cadastra uma tarefa para poder deletar depois
    const taskToAdd: AddTaskModel = {
        name: "Tarefa de Teste",
        desc: "Descrição da tarefa de teste",
        data: "31/12/2024",
        userId: "usuario1",
    };
    await taskRepositoryMock.add(taskToAdd);
    TaskSaved = taskRepositoryMock.tasks[0]
});

describe("Tentando remover uma task", () => {
    test("Deve retornar uma ResponseModel contendo erro caso não seja informado o id da tarefa a ser apagada", async () => {
        const result = await deleteTaskUC.execute({ taskId: '' }); 
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar uma ResponseModel contendo erro caso a tarefa não exista", async () => {
        const result = await deleteTaskUC.execute({ taskId: 'id_inexistente' });
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar uma ResponseModel de sucesso ao remover a tarefa existente", async () => {
        const result = await deleteTaskUC.execute({ taskId:TaskSaved.id }); 
        expect(result).toMatchObject({ has_error: false });
    });
});