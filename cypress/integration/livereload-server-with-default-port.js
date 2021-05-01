/// <reference types="cypress" />

// Start server (Do not delete this comment!):

//$ cliserver serve cypress/fixtures/dir2 -l -p 7101

context('Livereload server with default port', () => {

    it('index.html should update on content change', () => {
        cy.visit('http://localhost:7101')
        cy.get('h1').invoke('attr', 'data-cy').should('eq', 'v1')
        cy.window().then(window => window.beforeReload = true)
        cy.window().should('have.prop', 'beforeReload', true)
        cy.exec(`touch -m cypress/fixtures/dir2/index.html`)
        cy.wait(500)
        cy.window().should('not.have.prop', 'beforeReload', true)
    })

})
