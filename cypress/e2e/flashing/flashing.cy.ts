describe('Flashing', () => {
  it('screen should be open when tapping on icon', () => {
    cy.visit('/');
    cy.get('[data-testid="sideMenu__button"]').click();
    cy.get('[data-testid="sideMenu__button__flash"]').click();
    cy.contains("FLASHING");
  })
})