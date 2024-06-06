import about from "../../data/about.json";
import projects from "../../data/projects.json";

describe('testing the main page', () => {
  // TESTING ON MACBOOK 13 RESOLUTION
  context('testing the app on macbook-13 resolution', () => {
    beforeEach(() => {
      cy.viewport('macbook-13').visit('/');
    });

    it(`The title should be "Bienvenidos"`, () => {
      cy.get('[data-cy="title"]').should('have.text', 'Bienvenidos');
    })

    it('Testing the dark mode button', () => {
      cy.window().then(win => {
        cy.get('[data-switch-theme]').trigger('click');
        win.document.documentElement.classList.contains('not:dark');
        cy.get('[data-switch-theme]').trigger('click');
        win.document.documentElement.classList.contains('dark');
      });
    });

    it('Testing the scroll to top button', () => {
      cy.window().then(win => {
        win.addEventListener('scroll', () => {
          cy.get('[data-scroll-top]').should('be.visible').trigger('click');
          win.scrollY = 0;
        })
      })
    })

    it('Should retrieve data from general card and button events', () => {
      cy.get('[data-cy="social"]').find('button').each((item, index) => {
        if (index === 0) {
          cy.wrap(item).should('have.attr', 'value', about.social.discord)
        }
      })
      cy.get('[data-cy="social"]').find('a').each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.attr', 'href', about.social.linkedin)
            .and('have.attr', 'target', '_blank');
        } else if (index === 1) {
          cy.wrap(item)
            .should('have.attr', 'href', about.social.github)
            .and('have.attr', 'target', '_blank');
        }
      })
      cy.get('[data-cy="full-name"]').should('have.text', about.fullName);
      cy.get('[data-cy="description"]').should('have.text', about.description);
  
      // RESUME
      cy.get('[data-resume]').trigger('click');
      cy.get('[data-modal="resume"]').should('be.visible').within(() => {
          cy.get('p').should('have.text', 'Generando documento pdf...');
      });
      cy.wait(1000);
      cy.get('[data-modal="resume"]').should('not.be.visible');
      cy.get('[data-resume]').trigger('mouseover');
      cy.get('[data-tooltip="resume"]')
        .should('be.visible')
        .within(() => {
          cy.get('p').should('have.text', 'Descargar CV');
        })
      cy.get('[data-resume]').trigger('mouseleave');
      cy.get('[data-tooltip="resume"]').should('not.be.visible')
        
      // EXPERIENCE
      cy.get('[data-experience]').within(() => {
        cy.get('[data-cy-experience-years]').should('have.text', `+${new Date().getFullYear() - about.experience}`);
      })
      cy.get('[data-experience]').trigger('mouseover');
      cy.get('[data-tooltip="experience"]').should('be.visible').within(() => {
        cy.get('p').should('have.text', 'Experiencia');
      });
      cy.get('[data-experience]').trigger('mouseleave');
      cy.get('[data-tooltip="experience"]').should('not.be.visible');
    
      // TECHNOLOGIES
      cy.get('[data-technologies]').trigger('mouseover');
      cy.get('[data-tooltip="technologies"]').should('be.visible').within(() => {
        cy.get('p').should('have.text', 'Tecnologías');
      });
      cy.get('[data-technologies]').trigger('mouseleave');
      cy.get('[data-tooltip="technologies"]').should('not.be.visible');
    
      // CAROUSEL TECHNOLOGIES
      cy.get('[data-carousel]').trigger('mousedown');
      cy.get('[data-carousel]')
        .trigger('mousemove')
        .children()
        .should('be.visible');
      cy.get('[data-carousel]').trigger('mouseup');
      cy.get('[data-carousel]').trigger('mouseleave');
    })

    it('Should get the data of the projects and button events', () => {
      cy.get('[data-cy-projects]').each((project, index) => {
        cy.wrap(project).within(() => {
          cy.get('[data-cy="project-title"]').should('have.text', projects[index].title);
          cy.get('[data-cy="project-subtitle"]').should('have.text', projects[index].subtitle);
          cy.get(`[data-open-details-modal="${projects[index].id}"]`).trigger('mouseover');
          cy.get(`[data-details-tooltip="${projects[index].id}"]`).should('be.visible').within(() => {
            cy.get('p').should('have.text', 'Ver detalles');
          })
          cy.get(`[data-open-details-modal="${projects[index].id}"]`).trigger('mouseleave');
          cy.get(`[data-details-tooltip="${projects[index].id}"]`).should('not.be.visible');
          cy.get(`[data-open-details-modal="${projects[index].id}"]`).trigger('click');
        })
        cy.get(`[data-details-modal="${projects[index].id}"]`).should('be.visible').within(() => {
          cy.get(`[data-tags-carousel="${projects[index].id}"]`)
            .trigger('mousedown').then(() => {
              cy.get(`[data-tags-carousel="${projects[index].id}"]`)
                .trigger('mousemove')
                .within(() => {
                  cy.get('[data-cy="tags"]').each((tag, tagIndex) => {
                  cy.wrap(tag).within(() => {
                    cy.get('[data-cy="tag-name"]').should('have.text', projects[index].tags[tagIndex]);
                  })
                })
              });
            })
          cy.get(`[data-tags-carousel="${projects[index].id}"]`).trigger('mouseup');
          cy.get(`[data-tags-carousel="${projects[index].id}"]`).trigger('mouseleave');
          cy.get('[data-cy-description]').should('have.text', projects[index].description)
          cy.get('[data-cy-publish-date]').should('have.text', projects[index].publish);
          cy.get(`[data-close-details-modal="${projects[index].id}"]`).trigger('click');
        });
        cy.get(`[data-details-modal="${projects[index].id}"]`).should('not.be.visible');
        cy.get('[data-cy-project-buttons]').should('have.length', 2).each(() => {
          cy.get(`[data-github="${projects[index].id}"]`)
            .should('have.attr', 'href', projects[index].github)
            .and('have.attr', 'target', '_blank');
          cy.get(`[data-website="${projects[index].id}"]`)
            .should('have.attr', 'href', projects[index].link)
            .and('have.attr', 'target', '_blank');
        })
      });
    })

    it(`The footer should exist and contain a link to access to the repository`, () => {
      cy.get('[data-cy="footer"]').should('exist').each(() => {
        cy.get(`[data-cy="this-repository"]`).within(() => {
          cy.get('a')
            .should('have.attr', 'href', about.thisApp.repository)
            .and('have.attr', 'target', '_blank')
        })
      })
    })
  })

  // TESTING ON IPHONE 5 RESOLUTION
  context('testing the app on iphone-5 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-5').visit('/');
    });

    it('Testing the dark mode touch', () => {
      cy.window().then(win => {
        cy.get('[data-switch-theme]').trigger('touchstart');
        win.document.documentElement.classList.contains('not:dark');
        cy.get('[data-switch-theme]').trigger('touchstart');
        win.document.documentElement.classList.contains('dark');
      })
    });

    it('Testing the scroll to top touch', () => {
      cy.window().then(win => {
        win.addEventListener('scroll', () => {
          cy.get('[data-scroll-top]').should('be.visible').trigger('touchstart');
          win.scrollY = 0;
        })
      })
    })

    it('Should retrieve data from general card and touch events', () => {
      cy.get('[data-cy="social"]').find('button').each((item, index) => {
        if (index === 0) {
          cy.wrap(item).should('have.attr', 'value', about.social.discord)
        }
      })
      cy.get('[data-cy="social"]').find('a').each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.attr', 'href', about.social.linkedin)
            .and('have.attr', 'target', '_blank');
        } else if (index === 1) {
          cy.wrap(item)
            .should('have.attr', 'href', about.social.github)
            .and('have.attr', 'target', '_blank');
        }
      })
      cy.get('[data-cy="full-name"]').should('have.text', about.fullName);
      cy.get('[data-cy="description"]').should('have.text', about.description);
      cy.get('[data-resume]').trigger('touchstart');
      cy.get('[data-modal="resume"]').should('be.visible').within(() => {
        cy.get('p').should('have.text', 'Generando documento pdf...');
      });
      cy.wait(1000);
      cy.get('[data-modal="resume"]').should('not.be.visible');
      cy.get('[data-experience]').within(() => {
        cy.get('[data-cy-experience-years]').should('have.text', `+${new Date().getFullYear() - about.experience}`);
      })
  
      cy.get('[data-carousel]')
        .trigger('touchmove')
        .children()
        .should('be.visible');
      cy.get('[data-carousel]').trigger('touchend')
    });

    it('Should get the data of the projects and touch events', () => {
      cy.get('[data-cy-projects]').each((project, index) => {
        cy.wrap(project).within(() => {
          cy.get('[data-cy="project-title"]').should('have.text', projects[index].title);
          cy.get('[data-cy="project-subtitle"]').should('have.text', projects[index].subtitle);
          cy.get(`[data-open-details-modal="${projects[index].id}"]`).trigger('touchstart');
        })
        cy.get(`[data-details-modal="${projects[index].id}"]`).should('be.visible').within(() => {
          cy.get(`[data-tags-carousel="${projects[index].id}"]`)
            .trigger('touchmove', { force: true })
            .within(() => {
              cy.get('[data-cy="tags"]').each((tag, tagIndex) => {
                cy.wrap(tag).within(() => {
                  cy.get('[data-cy="tag-name"]').should('have.text', projects[index].tags[tagIndex]);
                })
              })
            });
          cy.get(`[data-tags-carousel="${projects[index].id}"]`).trigger('touchend');
          cy.get('[data-cy-description]').should('have.text', projects[index].description)
          cy.get('[data-cy-publish-date]').should('have.text', projects[index].publish);
          cy.get(`[data-close-details-modal="${projects[index].id}"]`).trigger('touchstart', { force: true });
        });
        cy.get(`[data-details-modal="${projects[index].id}"]`).should('not.be.visible');
        cy.get('[data-cy-project-buttons]').should('have.length', 2).each(() => {
          cy.get(`[data-github="${projects[index].id}"]`)
            .should('have.attr', 'href', projects[index].github)
            .and('have.attr', 'target', '_blank');
          cy.get(`[data-website="${projects[index].id}"]`)
            .should('have.attr', 'href', projects[index].link)
            .and('have.attr', 'target', '_blank');
        })
      });
    })

    it(`The footer should exist and contain a link to access to the repository`, () => {
      cy.get('[data-cy="footer"]').should('exist').each(() => {
        cy.get(`[data-cy="this-repository"]`).within(() => {
          cy.get('a')
            .should('have.attr', 'href', about.thisApp.repository)
            .and('have.attr', 'target', '_blank')
        })
      })
    })
  })
});