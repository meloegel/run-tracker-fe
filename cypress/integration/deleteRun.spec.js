// Delete Run Tests //

describe('Delete run tests', () => {
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
    it('Can login and navigate to my-run-list', () => {
        cy.get('button.submit').click()
        cy.wait(3000)
        cy.url().should('include', 'http://localhost:3000/')
        cy.get('.myRunList').click()
        cy.wait(3000)
    })
    it('Delete a run', () => {
        cy.get('button.delete').first().as('btn')
        cy.wait(1000)
        cy.get('@btn').click()

    })

})