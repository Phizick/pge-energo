describe('ContentComponent', () => {
    beforeEach(() => {
        // eslint-disable-next-line no-undef
        cy.visit('/')
    })

    it('Проверяем рендеринг и взаимодействуем со вкладками и элементами', () => {
        // eslint-disable-next-line no-undef
        cy.get('p-tabview-nav-container').should('exist')

        // eslint-disable-next-line no-undef
        cy.get('p-tabview-panels').click()

        // eslint-disable-next-line no-undef
        cy.get('tr').first().click().should('have.class', 'read-row')

        // eslint-disable-next-line no-undef
        cy.get('p-unselectable-text p-tabview-selected p-highlight').click()

        // eslint-disable-next-line no-undef
        cy.get('.p-card').first().click()
    })
})
