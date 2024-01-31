// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add('clickCard', (link) => {
    cy.get('.cards').contains(link).click()
  })
  
  // Create a function that takes selector, and value arguments
  // And selects the dropdown option from the web element
  Cypress.Commands.add('selectDropdownOption', (element, value) => {
    cy.get(element).select(value)
  })
  
  /**
   * Create a parent custom command called 'login'
   * Function will handle 'Html Elements' text input bars
   * It will two arguments, username and password
   * Treat first input bar as username, and second unput bar ass pasword
   */
  
  Cypress.Commands.add('login', (username, password) => {
    cy.get('#text_input1').type(username)
    cy.get('#text_input2').type(password)
  })
  
  /**
   * Create a parent custom command called have text
   * Function will get 2 arguments, locator and expected value
   * And it will validate the targeted web element has expected text
   */
  
  Cypress.Commands.add('haveText2', (el, value) => {
    cy.get(el).should('have.text', value)
  })
  
  //
  // -- This is a child command --
  // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
  //
  
  // Create the function that will log the text of the web element
  Cypress.Commands.add('logText', { prevSubject: true }, (subject) => {
    const text = subject.text()
  
    cy.log(`My text is: ${text}`)
  
    return cy.wrap(subject)
  })
  
  Cypress.Commands.add('haveText', { prevSubject: true }, (subject, value) => {
    cy.wrap(subject).should('have.text', value)
  })
  
  /**
   * Create a child custom command that will validate the attribute and the value of web element 
   */
  
  Cypress.Commands.add('assertAttribute', { prevSubject: true }, (subject, attribute, value) => {
    cy.wrap(subject).should('have.attr', attribute, value)
  })
  
  
  //
  // -- This is a child command --
  // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
  //
  //
  // -- This is a dual command --
  // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
  //
  //
  // -- This will overwrite an existing command --
  // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
  
  