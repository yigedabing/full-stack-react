describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5178')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains("I beg you, don't update any more, I can't learn anymore, woo woo")
  })

  it('login form can be opened', function () {
    cy.get('#login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('123456')
    cy.get('#login-button').click()
    cy.contains('Create a new note')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('input:first').type('admin')
      cy.get('input:last').type('123456')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('Create a new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
      console.log(1)
    })
  })
})
