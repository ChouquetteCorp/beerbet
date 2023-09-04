describe('HomePage', () => {
  it('should view Home as connected user', () => {
    cy.login('test')
    cy.visit('/')

    cy.get('.navbar__log').should('contain', 'Déconnexion')
    cy.get('.navbar__log').should('not.contain', 'Connexion')
    cy.get('.home').find('.p-button').should('have.length', 2)
  })

  it('should view Home Page as anonymous user', () => {
    cy.visit('/')

    cy.get('.navbar__log').should('contain', 'Connexion')
    cy.get('.navbar__log').should('not.contain', 'Déconnexion')
    cy.get('.p-button').should('contain', 'Connexion')
  })
})
