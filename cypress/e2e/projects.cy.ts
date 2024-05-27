import projects from "../../data/projects.json";

describe("testing the projects page", () => {
  beforeEach(() => {
    cy.visit('/projects');
  })

  it(`The title should be "Proyectos"`, () => {
    cy.get('[data-cy="title"]').should('have.text', 'Proyectos');
  })

  it('Should get the data of the project', () => {
    cy.get('[data-cy="projects"]').each((project, index) => {
      cy.wrap(project).within(() => {
        cy.get('[data-cy="project-title"]').should('have.text', projects[index].title);
        cy.get('[data-cy="project-subtitle"]').should('have.text', projects[index].subtitle);
        cy.get('[data-cy="project-description"]').should('have.text', projects[index].description);
        cy.get('[data-cy="tags"]').each((tag, tagindex) => {
          cy.wrap(tag).within(() => {
            cy.get('[data-cy="tag-name"]').should('have.text', projects[index].tags[tagindex]);
          })
        })
      })
    });
  })
})