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
    cy.get('[data-cy="linkedin"]')
      .then(($link) => {
      const url = $link.prop('href');
      cy.wrap($link).click();
      cy.url().should('eq', url);
    });
    cy.get('[data-cy="github"]')
      .then(($link) => {
      const url = $link.prop('href');
      cy.wrap($link).click();
      cy.url().should('eq', url);
    });
  })
});