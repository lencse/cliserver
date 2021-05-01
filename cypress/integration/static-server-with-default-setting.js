/// <reference types="cypress" />

// Start server (Do not delete this comment!):

//$ cliserver serve cypress/fixtures/dir1

context('Static server with default settings', () => {

    it('HTML content', () => {
        cy.visit('http://localhost:7100/index.html')
        cy.get('h1').should('contain', 'CLIserver test page')
    })

})
