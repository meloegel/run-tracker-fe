// Logout Tests //

describe('Logout tests', () => {
    it('can navigate to Login', () => {
        cy.visit('http://localhost:3000/login')
        cy.url().should('include', "localhost")
    })
    it('Can type in a username', () => {
        cy.get('input[name="username"]')
            .type('Lambda')
            .should('have.value', 'Lambda')
    })
    it('Can type password', () => {
        cy.get('input[name="password"]')
            .type('school')
            .should('have.value', 'school')
    })
    it('Can login and navigate to add run', () => {
        cy.get('button.submit').click()
        cy.wait(1000)
        cy.url().should('include', 'http://localhost:3000/')
        cy.get('.logout').click()
        cy.url().should('include', 'http://localhost:3000/')
        cy.get('.loginRegister')
    })

})