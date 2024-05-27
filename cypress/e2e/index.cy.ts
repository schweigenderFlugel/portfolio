import about from "../../data/about.json";

describe('testing the main page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should retrieve the data from the page', () => {
    cy.get('[data-cy="full-name"]').should('have.text', about.fullName);
    cy.get('[data-cy="description"]').should('have.text', about.description);
  })

  it('Should navigate to the links of social media', () => {
    cy.get('[data-cy="linkedin"]').click()
    .then(() => {
      cy.url().should('eq', about.social.linkedin);
    });
    cy.get('[data-cy="github"]').click()
    .then(() => {
      cy.url().should('eq', about.social.github);
    });
  })

  it('Should contain the technologies', () => {
    cy.get('[data-cy="technologies"]').should('have.length', 13);
  })
});