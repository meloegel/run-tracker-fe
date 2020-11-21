
describe('Login tests', () => {
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
    it('Can login', () => {
        cy.get('button.submit').click()
        cy.url().should('include', 'http://localhost:3000/')
    })
})

describe('Login errors', () => {
    it('can navigate to Login', () => {
        cy.visit('http://localhost:3000/login')
        cy.url().should('include', "localhost")
    })
    it('Show username error', () => {
        cy.get('input[name="username"]')
            .type('aaa')
        cy.contains('Please enter a valid username').should('exist')
    })
    it('Show password error', () => {
        cy.get('input[name="password"]')
            .type('aaa')
        cy.contains('Please enter your password').should('exist')
    })
})

describe('Register button on Login page directs to registration', () => {
    it('can navigate to Login', () => {
        cy.visit('http://localhost:3000/login')
        cy.url().should('include', "localhost")
    })
    it('Register button routes correctly', () => {
        cy.get('button.register').click()
        cy.url().should('include', 'http://localhost:3000/register')
    })
})
