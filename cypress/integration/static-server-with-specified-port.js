/// <reference types="cypress" />

// Start server (Do not delete this comment!):

//$ cliserver serve cypress/fixtures/dir1 -p 7103

context('Static server with specified port', () => {

    it('HTML content', () => {
        cy.visit('http://localhost:7103')
        cy.get('h1').should('contain', 'CLIserver test page')
    })

})
