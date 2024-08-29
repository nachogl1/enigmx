describe('Flashing', () => {
  it('screen should be open when tapping on icon', () => {
    cy.visit('/');
    cy.get('.button').click();
  })
})