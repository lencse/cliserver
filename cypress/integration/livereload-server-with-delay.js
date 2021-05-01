/// <reference types="cypress" />

// Start server (Do not delete this comment!):

//$ cliserver serve cypress/fixtures/dir2 -l -p 7102 -d 3000  -o 35800

context('Livereload server with delay', () => {

    it('Root file should update on content change only after the delay', () => {
        cy.visit('http://localhost:7102')
        cy.get('h1').invoke('attr', 'data-cy').should('eq', 'v1')
        cy.window().then(window => window.beforeReload = true)
        cy.exec(`touch -m cypress/fixtures/dir2/index.html`)
        cy.wait(500)
        cy.window().should('have.prop', 'beforeReload', true)
        cy.wait(4000)
        cy.window().should('not.have.prop', 'beforeReload', true)
    })

})
