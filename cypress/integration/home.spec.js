// Home Page Tests //

describe('Home page tests', () => {
    it('can navigate to Home page', () => {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', "localhost")
    })

})