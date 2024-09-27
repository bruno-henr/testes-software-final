describe("Testes de Sistema - Login de Usuário", () => {
  
    beforeEach(() => {
      cy.visit("http://localhost:8080"); // URL da sua aplicação
    });
  
    it("Deve exibir um erro ao tentar fazer login com campos em branco", () => {
      cy.get('#btnEntrar').click(); // Clique no botão de login
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Você precisa informar um e-mail para entrar'); // Mensagem esperada
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com email em branco", () => {
      cy.get('#inputLoginPassword').type('senha123'); // Preencher senha
      cy.wait(500); // Espera para garantir que o texto foi escrito
      cy.get('#btnEntrar').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Você precisa informar um e-mail para entrar'); // Mensagem esperada
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com senha em branco", () => {
      cy.get('#inputLoginEmail').type('teste@example.com'); // Preencher email
      cy.wait(500); // Espera para garantir que o texto foi escrito
      cy.get('#btnEntrar').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Você precisa informar uma senha para entrar'); // Mensagem esperada
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com credenciais inválidas", () => {
        cy.get('#inputLoginEmail').type('invalido@example.com');
        cy.get('#inputLoginPassword').type('senhaerrada');
        
        cy.get('#btnEntrar').click();
      
        // Espera o alerta aparecer
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Usuário não encontrado'); // Remova o ponto final
        });
      });
  
  });