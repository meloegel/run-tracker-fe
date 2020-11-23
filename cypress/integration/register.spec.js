// Registration Page Tests //

describe('Registration tests', () => {
    it('can navigate to Registration', () => {
        cy.visit('http://localhost:3000/register')
        cy.url().should('include', "localhost")
    })
    it('Can type in a username', () => {
        cy.get('input[name="username"]')
            .type('test')
            .should('have.value', 'test')
    })
    it('Can type password', () => {
        cy.get('input[name="password"]')
            .type('test')
            .should('have.value', 'test')
    })
    it('Can type email', () => {
        cy.get('input[name="email"]')
            .type('email@mail.com')
            .should('have.value', 'email@mail.com')
    })
    it('Can register', () => {
        cy.get('button.submit').click()
        cy.url().should('include', 'http://localhost:3000/login')
    })
})

describe('Registration errors', () => {
    it('can navigate to Registration', () => {
        cy.visit('http://localhost:3000/register')
        cy.url().should('include', "localhost")
    })
    it('Show username error', () => {
        cy.get('input[name="username"]')
            .type('aaa')
        cy.contains('Username must be at least four characters long').should('exist')
    })
    it('Show password error', () => {
        cy.get('input[name="password"]')
            .type('aaa')
        cy.contains('Password must be at least four characters long').should('exist')
    })
    it('Show email error', () => {
        cy.get('input[name="email"]')
            .type('email')
        cy.contains('The email must be a valid email address').should('exist')
    })
})

describe('Login button on Registration page directs to login', () => {
    it('can navigate to Registration', () => {
        cy.visit('http://localhost:3000/register')
        cy.url().should('include', "localhost")
    })
    it('Login button routes correctly', () => {
        cy.get('button.login').click()
        cy.url().should('include', 'http://localhost:3000/login')
    })
})
