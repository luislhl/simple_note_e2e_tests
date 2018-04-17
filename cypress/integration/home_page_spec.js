const mockNotes = [{
  id: "1",
  content: "Nota 1\nTexto da nota 1"
}, {
  id: "2",
  content: "Nota 2\nTexto da nota 2"
}, {
  id: "3",
  content: "Nota 3\nTexto da nota 3"
}];

describe('When there is no note in the DB', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      cy.spy(win.console, "log")
    })

    cy.resetDatabase().then(() => {
      cy.visit('/');
    });
  });

  describe('rendering', () => {
    it('successfully renders the list of notes', () => {
      cy.get('.note-item').should(lis => {
        expect(lis).to.have.length(0);
      });

      cy.get('.sidebar').should(sidebar => {
        expect(sidebar).to.contain('Nenhuma nota encontrada');
      });
    })
  });
});

describe('When there are notes in the DB', () => {
  beforeEach(() => {
    cy.resetDatabase().then(() => {
      cy.feedNotesTable(mockNotes).then(() => {
        cy.visit('/');
      });
    });
  });

  describe('rendering', () => {
    it('successfully renders the list of notes', () => {
      cy.get('.note-item').should(lis => {
        expect(lis).to.have.length(3);
      });
    })
  });

  describe('click on new note', () => {
    it('creates a new item on list', () => {
      cy.get('.note-item').should(lis => {
        expect(lis).to.have.length(3);
        expect(lis.first()).to.contain('Nota 1');
      });

      cy.get('#addNote').click();

      cy.get('.note-item').should(lis => {
        expect(lis).to.have.length(4);
        expect(lis.first()).to.contain('Escreva sua nota');
      });
    });
  });

  describe('click on a note', () => {
    it('shows it in the textarea', () => {
      cy.get('.note-item').first().click();

      cy.get('textarea').should(ta => {
        expect(ta).to.contain('Nota 1\nTexto da nota 1');
      });
    });
  });

  describe('edit a note', () => {
    it('changes its title in the list', () => {
      cy.get('.note-item').first().click();

      cy.get('textarea').clear();
      cy.get('textarea').type('Digitando novo texto\nSegunda linha');

      cy.get('.note-item').first().should(item => {
        expect(item).to.contain('Digitando novo texto');
      });
    });
  });
})
