import about from "../../data/about.json";
import projects from "../../data/projects.json";

describe('testing the main page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it(`The title should be "Bienvenidos"`, () => {
    cy.get('[data-cy="title"]').should('have.text', 'Bienvenidos');
  })

  it('Testing the dark mode', () => {
    cy.window().then(win => {
      const darkActive = win.document.documentElement.classList.contains('dark');
      if (darkActive) {
        cy.get('[data-cy="dark-mode"]').trigger('click');
        win.document.documentElement.classList.contains('not:dark');
      } else {
        cy.get('[data-cy="dark-mode"]').trigger('click');
        win.document.documentElement.classList.contains('dark');
      }
    })
  })

  it('Should retrieve data from general card', () => {
    cy.get('[data-cy="social"]').find('a').should('have.length', 2).each((link, index) => {
      if (index === 0) {
        cy.wrap(link).should('have.attr', 'href', about.social.linkedin);
      } else if (index === 1) {
        cy.wrap(link).should('have.attr', 'href', about.social.github);
      }
    })
    cy.get('[data-cy="full-name"]').should('have.text', about.fullName);
    cy.get('[data-cy="description"]').should('have.text', about.description);
    cy.get('[data-resume]').trigger('mouseover');
    cy.get('[data-tooltip="resume"]').should('be.visible');
    cy.get('[data-resume]').trigger('click');
    cy.get('[data-modal="resume"]').should('be.visible').within(() => {
      cy.get('p').should('have.text', 'Generando documento pdf...');
    });
    cy.wait(1000);
    cy.get('[data-modal="resume"]').should('not.be.visible');
    cy.get('[data-carousel]').trigger('mouseover');
    cy.get('[data-tooltip="technologies"]').should('be.visible').within(() => {
      cy.get('p').should('have.text', 'Tecnologías');
    });
    cy.get('[data-carousel]').trigger('mouseleave');
    cy.get('[data-tooltip="technologies"]').should('not.be.visible');
    cy.get('[data-experience]').trigger('mouseover');
    cy.get('[data-tooltip="experience"]').should('be.visible').within(() => {
      cy.get('p').should('have.text', 'Experiencia');
    });
    cy.get('[data-carousel]')
      .trigger('mousemove')
      .children()
      .should('be.visible');
    cy.get('[data-experience]').trigger('mouseleave');
    cy.get('[data-tooltip="experience"]').should('not.be.visible');
  })

  //it.only('Should get the data of the project', () => {
  //  cy.get('[data-cy="projects"]').each((project, index) => {
  //    cy.wrap(project).within(() => {
  //      cy.get('[data-cy="project-title"]').should('have.text', projects[index].title);
  //      cy.get('[data-cy="project-subtitle"]').should('have.text', projects[index].subtitle);
  //      cy.get(`#open-modal-${projects[index].id}`).trigger('click');
  //    })
  //  });
  //  cy.get(`#modal-${projects[0].id}`).should('be.visible').within(() => {
  //    cy.get(`#tags-carousel-${projects[0].id}`).trigger('mousedown');
  //    cy.get(`#tags-carousel-${projects[0].id}`).trigger('mouseup');
  //    cy.get(`#tags-carousel-${projects[0].id}`).trigger('mouseleave');
  //    cy.get(`#tags-carousel-${projects[0].id}`).trigger('mousemove');
  //    cy.get(`#close-modal-${projects[0].id}`).trigger('click');
  //    cy.get(`#modal-${projects[0].id}`).should('not.be.visible')
  //  });
  //  
  //})

  it(`The footer should exist and contain a link to access to the repository`, () => {
    cy.get('[data-cy="footer"]').should('exist').within(() => {
      cy.get(`[data-cy="this-repository"]`).within(() => {
        cy.get('a').should('have.attr', 'href', about.thisApp.repository).click()
      })
    })
  })
});