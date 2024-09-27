Aqui está um arquivo `README.md` otimizado com base nas suas instruções:

# Video demonstração
```
https://vimeo.com/1013394603/850ee3de7f?share=copy
```
---

```markdown
# Projeto de Gerenciamento de Tarefas

Este projeto utiliza Prisma como ORM e PostgreSQL como banco de dados para gerenciar tarefas associadas a usuários. Aqui estão as instruções para instalação, configuração e execução de testes.

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- Prisma

## Instalação

### 1. Instalar dependências

Execute o seguinte comando para instalar todas as dependências do projeto:

```bash
npm install
```

### 2. Configurar o banco de dados

Crie um arquivo `.env` na raiz do projeto e configure a variável `DATABASE_URL` com as informações do seu banco de dados PostgreSQL:

```
DATABASE_URL="postgresql://<usuário>:<senha>@<host>:<porta>/<nome_do_banco>"
```

### 3. Sincronizar o Prisma com o banco de dados

Após configurar o `.env`, execute o comando abaixo para aplicar os modelos Prisma ao banco de dados:

```bash
npx prisma db push
```

## Executando os Testes

O projeto está configurado para utilizar **Vitest** para testes unitários e **Cypress** para testes de sistema.

### 1. Rodar testes unitários e de integração

- Para rodar os testes unitários com Vitest, use o seguinte comando:

```bash
npm run test-u
```

- Para rodar os testes de integração, utilize:

```bash
npm run test-i
```

### 2. Rodar testes de sistema

Antes de executar os testes de sistema, certifique-se de que a aplicação está rodando.

- Inicie a aplicação (caso possua um script para isso):

```bash
npm run dev
```

- Em seguida, execute os testes de sistema com Cypress:

```bash
npm run test-s
```

## Observações

- O comando `npx prisma db push` sincroniza os modelos do Prisma com o banco de dados, criando as tabelas necessárias.
- O teste de sistema requer que a aplicação esteja em execução, portanto, inicie a aplicação antes de rodar os testes com Cypress.

---
```
