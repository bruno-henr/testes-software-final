import { beforeAll, describe, expect, test } from 'vitest';
import { TaskRepositoryMock } from './Mock/TaskRepositoryMock';
import { AddTaskModel } from '../Dto';
import { AddTaskUseCase } from '../UseCase';

let taskRepositoryMock: TaskRepositoryMock;
let taskAddUC: AddTaskUseCase;

beforeAll(() => {
    taskRepositoryMock = new TaskRepositoryMock();
    taskAddUC = new AddTaskUseCase(taskRepositoryMock);
});

describe("Tentando cadastrar uma tarefa", () => {
    test("Deve retornar uma ResponseModel contendo um erro se todos os campos estiverem em branco", async () => {
        const dataToSend: AddTaskModel = {
            name: '',
            desc: '',
            data: '',
            userId: '',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com nome vazio", async () => {
        const dataToSend: AddTaskModel = {
            name: '',
            desc: 'Descrição válida',
            data: '31/12/2024',
            userId: 'usuario1',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com descrição vazia", async () => {
        const dataToSend: AddTaskModel = {
            name: 'Tarefa com descrição vazia',
            desc: '',
            data: '31/12/2024',
            userId: 'usuario2',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com data vazia", async () => {
        const dataToSend: AddTaskModel = {
            name: 'Tarefa com data vazia',
            desc: 'Descrição válida',
            data: '',
            userId: 'usuario3',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com userId vazio", async () => {
        const dataToSend: AddTaskModel = {
            name: 'Tarefa com userId vazio',
            desc: 'Descrição válida',
            data: '31/12/2024',
            userId: '',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com data em formato inválido", async () => {
        const dataToSend: AddTaskModel = {
            name: 'Tarefa com data inválida',
            desc: 'Descrição válida',
            data: '31-12-2024',
            userId: 'usuario4',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar erro ao tentar adicionar tarefa com data inválida", async () => {
        const dataToSend: AddTaskModel = {
            name: 'Tarefa com data inválida',
            desc: 'Descrição válida',
            data: '32/12/2024',
            userId: 'usuario5',
        };
        const result = await taskAddUC.execute(dataToSend);
        expect(result).toMatchObject({ has_error: true });
    });

    test("Deve retornar sucesso ao cadastrar uma tarefa válida", async () => {
        const taskData: AddTaskModel = {
            name: 'Nova Tarefa',
            desc: 'Descrição da nova tarefa',
            data: '31/12/2024',
            userId: 'usuario6',
        };
        const result = await taskAddUC.execute(taskData);
        expect(result).toMatchObject({ has_error: false });
    });

    test("Deve permitir a criação de múltiplas tarefas com nomes e descrições duplicadas", async () => {
        const taskData1: AddTaskModel = {
            name: 'Tarefa Duplicada',
            desc: 'Descrição duplicada',
            data: '31/12/2024',
            userId: 'usuario7',
        };

        const taskData2: AddTaskModel = {
            name: 'Tarefa Duplicada',
            desc: 'Descrição duplicada',
            data: '31/12/2024',
            userId: 'usuario8',
        };

        const result1 = await taskAddUC.execute(taskData1);
        const result2 = await taskAddUC.execute(taskData2);

        expect(result1).toMatchObject({ has_error: false });
        expect(result2).toMatchObject({ has_error: false });
    });
});