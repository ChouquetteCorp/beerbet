describe('createAnEvent', () => {
  it('should create an event from list event', () => {
    cy.login('test4')
    cy.visit('/creation')
    cy.get('#title').click()
    cy.get('#title').type('Test Event')
    cy.get('#subtitle').type('new Event')

    cy.get('input[type=file]').selectFile('tests/e2e/fixtures/chouquette.png', { force: true })

    cy.get('#description').click()
    cy.get('#description').type('description')

    cy.get('#location').click()
    cy.get('#location').type('location')

    cy.get('.p-chips-input-token > input').click()
    cy.get('#propositions').find('.p-chips-token').should('have.length', 0)
    cy.get('.p-chips-input-token > input').type('A{enter}')
    cy.get('.p-chips-input-token > input').type('B{enter}')

    cy.get('#propositions').find('.p-chips-token').should('have.length', 2)

    cy.get('body').then(($body: any) => {
      if ($body.find('.p-toast-icon-close-icon').length) {
        cy.get('.p-toast-icon-close-icon').click() // close toast notification if exists
      }
    })

    cy.get('#btn-validate').should('contain', 'Créer').click()

    // should be on event page
    cy.location('pathname').should('match', /\/event\/([0-9]+)/)

    cy.get('h3').should('contain', 'Test Event')
    cy.get('.event__subtitle').should('contain', 'new Event')
    cy.get('.event__description').should('contain', 'description')
    cy.get('.event__location').should('contain', 'location')

    cy.get('.p-speeddial > .p-button').click()
    cy.get('[style="transition-delay: 0ms;"] > .p-speeddial-action').click()

    cy.get('.p-dialog .p-dialog-header').should('contain', 'Clore le pari')
    cy.get('.p-confirm-dialog-reject > .p-button-label').click()

    cy.get('.p-speeddial .p-button-icon-only').click()
    cy.get('.p-speeddial-item:nth-child(2) > .p-speeddial-action').click()

    cy.location('pathname').should('match', /\/creation\/([0-9]+)/)
    cy.get('#title').should('have.value', 'Test Event')

    cy.get('#title').click()
    cy.get('#title').clear().type('Test Event edit')

    cy.get('#date > .p-inputtext').click().type('{downArrow}{downArrow}{downArrow}{downArrow}{enter}{esc}')

    cy.get('.p-button-success').should('contain', 'Modifier').click()

    cy.location('pathname').should('match', /\/event\/([0-9]+)/)

    cy.get('h3').should('contain', 'Test Event edit')

    cy.contains('Parier').click()

    cy.get('.bet-modal__guesses-wrapper').find('.p-button').should('have.length', 2)
    cy.get('.bet-modal__guesses-wrapper').find('.p-button').first().should('contain', 'A')
    cy.get('.bet-modal__guesses-wrapper').find('.p-button').last().should('contain', 'B').click()

    cy.get('.bet-modal__chouquettes-wrapper').find('.bet-modal__chouquette').should('have.length', 3)

    cy.getBySel('minus-button').click().click()
    cy.get('.bet-modal__chouquettes-wrapper').find('.bet-modal__chouquette').should('have.length', 1)
    cy.getBySel('plus-button').click().click().click().click()
    cy.get('.bet-modal__chouquettes-wrapper').find('.bet-modal__chouquette').should('have.length', 5)

    cy.get('.bet-modal__submit-wrapper > .p-button').click()

    cy.get('.p-toast-message-success .p-toast-detail').should('contain', '5 bières pariées')

    cy.get('.event__bet-sentence').should('contain', 'Tu as parié 5 bières sur « B »')

    cy.contains('Modifier mon pari').click()
    cy.get('.bet-modal__chouquettes-wrapper').find('.bet-modal__chouquette').should('have.length', 5)

    cy.getBySel('minus-button').click().click()
    cy.get('.bet-modal__chouquettes-wrapper').find('.bet-modal__chouquette').should('have.length', 3)
    cy.get('.bet-modal__submit-wrapper > .p-button').click()

    cy.get('.p-toast-message-success .p-toast-detail').should('contain', '3 bières pariées')

    cy.get('.event__bet-sentence').should('contain', 'Tu as parié 3 bières sur « B »')

    cy.get('.p-speeddial .p-button-icon-only').click()
    cy.get('.p-speeddial-item:nth-child(3) > .p-speeddial-action').click()

    cy.get('.p-dialog .p-dialog-header').should('contain', 'Supprimer le pari')
    cy.get('.p-confirm-dialog-accept > .p-button-label').click()

    cy.location('pathname').should('contain', '/my-bets')

    cy.should('not.contain', 'Test Event edit')
  })
})
