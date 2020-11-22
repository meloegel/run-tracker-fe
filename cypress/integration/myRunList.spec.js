// My Run List Tests //

describe('My-Run-List tests', () => {
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
        cy.get('button.submit').click() // doesnt wait for login to go through
        cy.wait(2000)
        cy.url().should('include', 'http://localhost:3000/')
        cy.get('.myRunList').click()
        cy.wait(1000)
    })
    it('Runs should be displayed', () => {
        cy.contains('Run Time').should('exist')
    })
    it('Totals should be displayed', () => {
        cy.contains('Total Distance Ran').should('exist')
        cy.contains('Total Runs').should('exist')
    })
})