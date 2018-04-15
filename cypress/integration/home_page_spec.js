describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // describe('rendering', () => {
  //   it('successfully renders as expected', () => {
  //     cy.get('.note-item').should(lis => {
  //       expect(lis).to.have.length(3);
  //     });
  //   })
  // });

  describe('click on new note', () => {
    it('creates a new item on list', () => {
      cy.get('.note-item').should(lis => {
        // expect(lis).to.have.length(3);
        expect(lis.first()).to.contain('Nota 1');
      });

      cy.get('#addNote').click();

      cy.get('.note-item').should(lis => {
        // expect(lis).to.have.length(4);
        expect(lis.first()).to.contain('Escreva sua nota');
      });
    });
  });

  // describe('click on a note', () => {
  //   it('shows it in the textarea', () => {
  //     cy.get('.note-item').first().click();

  //     cy.get('textarea').should(ta => {
  //       expect(ta).to.contain('Nota 1\nNova linha');
  //     });
  //   });
  // });
})
