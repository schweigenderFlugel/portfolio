import about from "../../data/about.json";

describe('testing the main page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should retrieve the data from the page', () => {
    cy.get('[data-cy="full-name"]').should('have.text', about.fullName);
    cy.get('[data-cy="description"]').should('have.text', about.description);
  })
});