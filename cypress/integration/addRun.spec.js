// Add Run Page Tests //

describe('Add run tests', () => {
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
    it('Can navigate to add run', () => {
        cy.visit('http://localhost:3000/my-run-list')
        cy.get('button.addRun').click()
    })
    it('Can type in run time', () => {
        cy.get('input[name="runTime"]')
            .type('9:00')
            .should('have.value', '9:00')
    })
    it('Can type in pace', () => {
        cy.get('input[name="pace"]')
            .type('9:00')
            .should('have.value', '9:00')
    })
})