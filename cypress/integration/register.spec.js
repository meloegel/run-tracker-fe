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
    it('Can type password', () => {
        cy.get('input[name="email"]')
            .type('email@mail.com')
            .should('have.value', 'email@mail.com')
    })
    it('Can register', () => {
        cy.get('button.submit').click()
        cy.url().should('include', 'http://localhost:3000/login')
    })
})
