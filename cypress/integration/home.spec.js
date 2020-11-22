// Home Page Tests //

describe('Home page tests', () => {
    it('can navigate to Home page', () => {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', "localhost")
    })
    it('published runs should be displayed', () => {
        cy.contains('Run Time').should('exist')
    })
    it('Login button routes correctly', () => {
        cy.get('button.login').click()
        cy.url().should('include', 'http://localhost:3000/login')
    })
    it('Register button routes correctly', () => {
        cy.visit('http://localhost:3000/')
        cy.get('button.register').click()
        cy.url().should('include', 'http://localhost:3000/register')
    })
})