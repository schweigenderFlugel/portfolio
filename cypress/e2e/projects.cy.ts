import projects from "../../data/projects.json";
import about from "../../data/about.json";

describe("testing the projects page", () => {
  beforeEach(() => {
    cy.visit('/projects');
  })

  it(`The title should be "Proyectos"`, () => {
    cy.get('[data-cy="title"]').should('have.text', 'Proyectos');
  })

  it(`The footer should exist and contain a link to access to the repository`, () => {
    cy.get('[data-cy="footer"]').should('exist').within(() => {
      cy.get(`[data-cy="this-repository"]`).within(() => {
        cy.get('a').should('have.attr', 'href', about.thisApp.repository).click()
      })
    })
  })

  it('Should get the data of the project', () => {
    cy.get('[data-cy="projects"]').each((project, index) => {
      cy.wrap(project).within(() => {
        cy.get('[data-cy="project-title"]').should('have.text', projects[index].title);
        cy.get('[data-cy="project-subtitle"]').should('have.text', projects[index].subtitle);
        cy.get('[data-cy="project-description"]').should('have.text', projects[index].description);
      })
    });
  })

  it('Should contain a carousel containing all the technologies used and call a function', () => {
    cy.window().then(win => {
      cy.spy(win, 'addEventListener').as('carousel-move-spy');
      cy.get(`#carousel-1`).trigger('mousedown');
      cy.get(`#carousel-1`).trigger('mouseup');
      cy.get(`#carousel-1`).trigger('mouseleave');
      cy.get(`#carousel-1`).trigger('mousemove');
      cy.get('@carousel-move-spy').should('have.been.calledWith');
      cy.get('[data-cy="projects"]').each((project, index) => {
        cy.wrap(project).within(() => {
          cy.get('[data-cy="tags"]').each((tag, tagindex) => {
            cy.wrap(tag).within(() => {
              cy.get('[data-cy="tag-name"]').should('have.text', projects[index].tags[tagindex]);
            })
          })
        })
      })
    });
  })

  it('Should contain the button that triggers the a tooltip and the modal with images', () => {
    cy.window().then(win => {
      cy.spy(win, 'addEventListener').as('open-modal-spy');
      cy.get('#open-modal-1').trigger('mouseover');
      cy.get('[data-tooltip=images-1]').should('be.visible');
      cy.get('#open-modal-1').trigger('mouseleave');
      cy.get('[data-tooltip=images-1]').should('not.be.visible');
      cy.get('#open-modal-1').trigger('click');
      cy.get('#modal-1').should('be.visible').within(() => {
        cy.get('div').within(() => {
          cy.get('[data-cy="project-images"]').each((image, index) => {
            cy.wrap(image).should('have.text', projects[0].images[index]);
          })
        })
      });
      cy.get('#close-modal-1').trigger('click');
      cy.get('#modal-1').should('not.be.visible');
    })
  })
})