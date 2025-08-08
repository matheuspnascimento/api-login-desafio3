describe('Resetar Senha', () => {
  it('Resetar senha deve exibir mensagem de sucesso', () => {
    cy.visit('/');
    cy.get('#tabResetLink').click();
    cy.get('#usuarioReset').click().type('Matheus');
    cy.get('#novaSenha').click().type('novaSenha123');
    cy.get('#resetSubmitBtn').click();
    cy.get('#resetResult').should('contain.text', 'Senha resetada');
  });
});

