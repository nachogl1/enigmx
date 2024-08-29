describe('Reading', () => {
  it('screen should be open by default', () => {
    cy.visit('/');
    cy.contains('ENIGMX');
    cy.contains('READING');
  })
})