import { beforeAll, describe, expect, test } from 'vitest';
import { UserRepositoryMock } from './mock/UserRepositoryMock';
import { AddUserUseCase } from '../UseCase';

let addUserUC: AddUserUseCase;

beforeAll(() => {
    const repo = new UserRepositoryMock();
    addUserUC = new AddUserUseCase(repo);
});

describe("Tentando cadastrar um usuário sem informar nenhum campo requerido.", () => {
    test("Deve retornar um ResponseModel contendo um erro.", async () => {
        const data = {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };
        const result = await addUserUC.execute(data);
        expect(result).toMatchObject({has_error:true})
    });
});
test("Deve retornar um erro se o campo 'name' estiver vazio.", async () => {
    const data = {
        name: '',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se o campo 'email' estiver vazio.", async () => {
    const data = {
        name: 'Test User',
        email: '',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se o campo 'phoneNumber' estiver vazio.", async () => {
    const data = {
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se o campo 'password' estiver vazio.", async () => {
    const data = {
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: '',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se o campo 'confirmPassword' estiver vazio.", async () => {
    const data = {
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: ''
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se o email já estiver cadastrado.", async () => {
    const existingUserData = {
        name: 'Existing User',
        email: 'duplicate@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    // Adiciona um usuário existente
    await addUserUC.execute(existingUserData);

    const newData = {
        name: 'New User',
        email: 'duplicate@example.com',
        phoneNumber: '987654321',
        password: 'password456',
        confirmPassword: 'password456'
    };
    const result = await addUserUC.execute(newData);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve retornar um erro se as senhas não conferirem.", async () => {
    const data = {
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'differentPassword'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});
test("Deve cadastrar um usuário com todos os campos válidos.", async () => {
    const data = {
        name: 'Valid User',
        email: 'valid@example.com',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: false });
});
test("Deve retornar um erro se o email for inválido.", async () => {
    const data = {
        name: 'Test User',
        email: 'invalid-email',
        phoneNumber: '123456789',
        password: 'password123',
        confirmPassword: 'password123'
    };
    const result = await addUserUC.execute(data);
    expect(result).toMatchObject({ has_error: true });
});