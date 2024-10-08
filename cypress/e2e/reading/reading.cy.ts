describe('Reading', () => {
  it('screen should be open by default', () => {
    cy.visit('/');
    cy.contains('ENIGMA');
    cy.contains('READING');
  })
})