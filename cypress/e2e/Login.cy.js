describe('Login', () => {
  it('Login com credenciais válidas deve receber mensagem de sucesso e token', () => {
    cy.visit('/');
    cy.get('#usuario').click().type('Matheus');
    cy.get('#senha').click().type('123456');
    cy.get('#loginSubmitBtn').click();
    cy.get('#loginResult').should('contain.text', 'Login realizado');
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.be.a('string').and.to.have.length.greaterThan(10);
    });
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Login com credenciais válidas deve receber mensagem de sucesso e token', () => {
    // Actions
    cy.get('#usuario').click().type('Matheus')
    cy.get('#senha').click().type('123456')
    cy.get('#loginSubmitBtn').click()

    // Assertions
    cy.contains('#loginResult', 'Login realizado com sucesso!')
  })
  it('Login com credenciais inválidas deve retornar mensagem de credenciais inválidas', () => {
    // Actions
    cy.get('#usuario').click().type('Inexistente')
    cy.get('#senha').click().type('000000')
    cy.get('#loginSubmitBtn').click()

    // Assertions
    cy.contains('#loginResult', 'Credenciais inválidas')
 })
  it('Login com usuário válido e senha inválida deve retornar mensagem de que a senha será bloqueada', () => {
     // Actions
     cy.get('#usuario').click().type('Julia')
     cy.get('#senha').click().type('654321')
     cy.get('#loginSubmitBtn').click()
 
     // Assertions
     cy.contains('#loginResult', 'Senha', 'bloqueada')
  })
  it('Deve resetar a senha ao informar usuário válido e nova senha', () => {
    // Actions
    cy.get('#tabResetLink').click()
    cy.get('#usuarioReset').click().type('Matheus')
    cy.get('#novaSenha').click().type('123456')
    cy.get('#resetSubmitBtn').click()

    // Assertions
    cy.contains('#resetResult', 'Senha resetada com sucesso')
  })
  it('Deve retornar credenciais inválidas ao tentar resetar a senha de um usuário inexistente', () => {
    cy.get('#tabResetLink').click()
    cy.get('#usuarioReset').click().type('Inexistente')
    cy.get('#novaSenha').click().type('123456')
    cy.get('#resetSubmitBtn').click()

    // Assertions
    cy.contains('#resetResult', 'Credenciais inválidas')
  })
})