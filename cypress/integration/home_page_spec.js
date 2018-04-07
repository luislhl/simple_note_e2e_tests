describe('The Home Page', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'OPTIONS',
      url: 'http://localhost:4000/graphql',
      status: 204
    });

    cy.route({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      status: 200,
      response: 'fixture:notes.json'
    });

    cy.visitStub('/');
  });

  describe('rendering', () => {
    it('successfully renders as expected', () => {
      cy.get('.note-item').should(lis => {
        expect(lis).to.have.length(3);
      });
    })
  });

  describe('click on new note', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:4000/graphql',
        status: 200,
        response: 'fixture:addNote.json'
      });

      cy.get('#addNote').click();
    });

    it('creates a new item on list', () => {
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
        expect(ta).to.contain('Nota 1\nNova linha');
      });
    });
  });
})
