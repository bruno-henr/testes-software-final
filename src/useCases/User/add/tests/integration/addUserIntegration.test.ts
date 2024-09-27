import { app } from "../../../../../App";
import { describe, test, expect, afterAll } from 'vitest';
import request from "supertest";
import { prisma } from "../../../../../Database";

describe("Testando cadastro de usuário", () => {

    test("Deve retornar um erro ao enviar todos os campos requeridos em branco.", async () => {
        const dataToSend = {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };
        
        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar um erro se o campo 'name' estiver vazio.", async () => {
        const dataToSend = {
            name: '',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar um erro se o e-mail for inválido.", async () => {
        const dataToSend = {
            name: 'Teste',
            email: 'emailinvalido',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve retornar um erro se as senhas não coincidirem.", async () => {
        const dataToSend = {
            name: 'Teste',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha321'
        };

        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true });
    });

    test("Deve cadastrar o usuário com sucesso com todos os dados válidos.", async () => {
        const dataToSend = {
            name: 'Teste',
            email: 'teste@example.com',
            phoneNumber: '1234567890',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        console.log(response)
        expect(response.status).toBe(200); 
        expect(response.body).toMatchObject({ has_error: false });
    });

    test("Deve retornar um erro ao tentar cadastrar um e-mail já existente.", async () => {
        const dataToSend = {
            name: 'Teste Duplicado',
            email: 'teste@example.com',
            phoneNumber: '0987654321',
            password: 'senha456',
            confirmPassword: 'senha456'
        };

        const response = await request(app)
            .post("/user")
            .send(dataToSend);
        
        expect(response.status).toBe(400); 
        expect(response.body).toMatchObject({ has_error: true});
    });
});

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'teste@example.com' } });
});