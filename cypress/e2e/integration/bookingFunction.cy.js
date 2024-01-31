///<reference types="cypress"/>
import BookingPage from '../../pages/BookingPage'

describe('booking page test', () => {
  beforeEach(() => {

    cy.clickCard('Booking Function')

    cy.fixture('bookingFixture').then(function (data) {
      this.labels = data.labels
      this.options = data.options
      this.expectedText = data.expectedText
      this.options2 = data.options2
      this.expectedText2 = data.expectedText2
      this.options3 = data.options3
      this.expectedText3= data.expectedText3
    })


  })

  const bookingPage = new BookingPage()

  /** 
  *Validate that the “One way” radio button is displayed enabled and selected by default .
  *Validate that the “Round trip” radio button is displayed enabled and not selected by default.
  *Validate that the “Cabin Class” label. and dropdown are displayed
  *Validate that the “From” label. and dropdown are displayed
  *Validate that the “To” label. and dropdown are displayed
  *Validate that the “Depart” label. and date picker is displayed
  *Validate that the “Return” label .and date picker is displayed and disabled
  *Validate that the “Number of passengers” label. and dropdown are displayed and 1 is the default
  *Validate that the “Passenger 1” category label. and dropdown are displayed and “Adult (16-64)” is the default
  *Validate that the “BOOK” button is displayed and enabled
  */

  it('Test Case 01 - Validate the default Book your trip form', function () {
    bookingPage.getRadioButton().each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should('be.visible').and('be.enabled').should('have.attr', 'checked')
      } else {
        cy.wrap($el).should('be.visible').and('be.enabled').should('not.have.attr', 'checked')

      }
    })

    bookingPage.getLabels().each(($el, index) => {
      cy.wrap($el).should('have.text', this.labels[index]).should('be.visible')
    })

    bookingPage.getDropdowns().each(($el) => {
      cy.wrap($el).should('exist').and('be.visible')
    })

    bookingPage.getDateInput().each(($el, index) => {

      if (index === 0) {
        cy.wrap($el).should('have.attr', 'placeholder', 'MM/DD/YY').should('be.enabled').and('be.visible')
      } else {
        cy.wrap($el).should('have.attr', 'placeholder', 'MM/DD/YY')
          .should('be.disabled').and('be.visible')
      }
    }).first().click()

    bookingPage.getDatePicker().should('be.visible')
    bookingPage.getDateInput().eq(0)
      .clear()
      .should('have.value', '')
      .type('{enter}')

    bookingPage.getDropdowns().eq(3).should('have.value', '1')
    bookingPage.getDropdowns().eq(4).should('have.value', 'Adult (16-64)')
    bookingPage.getBookButton().should('be.visible').and('be.enabled')

  })


  /**
  *Click on the “Round trip” radio button and validate it is selected
  *Validate that the “One way” radio button is not selected
  *Validate that the “Cabin Class” label and dropdown are displayed
  *Validate that the “From” label and dropdown are displayed
  *Validate that the “To” label and dropdown are displayed
  *Validate that the “Depart” label and date picker is displayed
  *Validate that the “Return” label and date picker is displayed
  *Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
  *Validate that the “Passenger 1” label and dropdown are displayed and “Adult (16-64)” is the default
  *Validate that the “BOOK” button is displayed and enabled
  */

  it('Test Case 02 - Validate the Book your trip form when Round trip is selected', function () {

    bookingPage.getRadioButton().first().check()
      .should('be.checked')
    bookingPage.getRadioButton().eq(1).should('not.be.checked')

    bookingPage.getLabels().each(($el, index) => {
      cy.wrap($el).should('have.text', this.labels[index]).should('be.visible')
    })

    bookingPage.getDropdowns().each(($el) => {
      cy.wrap($el).should('exist').and('be.visible')
    })

    bookingPage.getDateInput().each(($el, index) => {

      if (index === 0) {
        cy.wrap($el).should('have.attr', 'placeholder', 'MM/DD/YY').and('be.enabled').should('be.visible')
      } else {
        cy.wrap($el).should('have.attr', 'placeholder', 'MM/DD/YY')
          .should('be.disabled')
      }
    }).first().click()

    bookingPage.getDatePicker().should('be.visible')
    bookingPage.getDateInput().eq(0)
      .clear()
      .should('have.value', '')
      .type('{enter}')


    const defaultNumberofPassenger = '1'
    const defaultPassenger = 'Adult (16-64)'
    bookingPage.getDropdowns().eq(3).should('have.value', `${defaultNumberofPassenger}`)
    bookingPage.getDropdowns().eq(4).should('have.value', `${defaultPassenger}`)


    bookingPage.getBookButton().should('be.enabled').and('be.visible')



  })

  /** 
  *Select the “One way” radio button
  *Select “Business” for the “Cabin Class” dropdown
  *Select “Illinois” for the “From” dropdown
  *Select “Florida” for the “To” dropdown
  *Select the next week for the ”Depart”
  *Select “1” for the “Number of passengers” dropdown
  *Select “Senior (65+)” for the Passenger 1 dropdown
  *Click on the “BOOK” button
  *Validate the booking information displayed below
  *DEPART
  *IL to FL
  *{dynamic date}
  *Number of passengers: 1
  *Passenger 1: Senior (65+)
  *Cabin Class: Business
  */

  it('Test Case 03 - Validate the booking for 1 passenger and one way', function () {

    bookingPage.getRadioButton().eq(1).check()

    bookingPage.getDropdowns().each(($el, index) => {
      cy.wrap($el, index).select(this.options[index])
    })

    let curentD = new Date()
    const nextweekDate = new Date(curentD)
    nextweekDate.setDate(curentD.getDate() + 7)

    bookingPage.getDateInput().eq(0).click()
    bookingPage.getDatePicker().type(`${nextweekDate}{enter}`)
    bookingPage.getBookButton().click()

    let header1 = 'DEPART'
    let header3 = 'IL to FL'

    bookingPage.getHeader1().contains(`${header1}`)
    bookingPage.getHeader3().contains(`${header3}`)

    bookingPage.getParagraph().each(function ($el, index){
      cy.wrap($el, index).contains(this.expectedText[index])
    })

  })

  /**
* Navigate to https://techglobal-training.com/frontend/project-3
*Select the “Round trip” radio button
*Select “First” for the “Cabin Class” dropdown
*Select “California” for the “From” dropdown
*Select “Illinois” for the “To” dropdown
*Select the next week for the ”Depart”
*Select the next month for the “Return”
*Select “1” for the “Number of passengers” dropdown
*Select “Adult (16-64)” for the Passenger 1 dropdown
*Click on the “BOOK” button
*Validate the booking information displayed below
*DEPART
*CA to IL
*{dynamic date}
*Number of passengers: 1
*Passenger 1: Adult (16-64)
*Cabin Class: First
*RETURN
*IL to CA
*{dynamic date}
*/

  it('Test Case 04 - Validate the booking for 1 passenger and round trip', function () {
    bookingPage.getRadioButton().eq(1).check()

    bookingPage.getDropdowns().each(function ($el, index) {
      cy.wrap($el, index).select(this.options2[index])
    })

    bookingPage.getDateInput().first().click()
    bookingPage.getDatePicker().click()

    bookingPage.getBookButton().click()


    let header1 = ['DEPART', 'RETURN']
    bookingPage.getHeader1().each(($el, index) =>{
      cy.wrap($el, index).should('have.text',header1[index])
    })

    let header3 = ['CA to IL', 'IL to CA']
    bookingPage.getHeader3().each(($el, index) => {
      cy.wrap($el, index).should('have.text', header3[index])
    })
    bookingPage.getParagraph().each(function($el, index){
      cy.wrap($el, index).have(this.expectedText2[index])
    })


    })
 
  /** *
  *Navigate to https://techglobal-training.com/frontend/project-3
  *Select the “One way” radio button
  *Select “Premium Economy” for the “Cabin Class” dropdown
  *Select “New York” for the “From” dropdown
  *Select “Texas” for the “To” dropdown
  *Select the next day for the ”Depart”
  *Select “2” for the “Number of passengers” dropdown
  *Select “Adult (16-64)” for the Passenger 1 dropdown
  *Select “Child (2-11)” for the Passenger 2 dropdown
  *Click on the “BOOK” button
  *Validate the booking information displayed below
  *DEPART
  *NY to TX
  *{dynamic date}
  *Number of passengers: 2
  *Passenger 1: Adult (16-64)
  *Passenger 2: Child (2-11)
  *Cabin Class: Premium Economy 
  */

  it.only('Test Case 05 - Validate the booking for 2 passengers and one way', function() {
    bookingPage.getRadioButton(1).check()
   
   bookingPage.getDropdowns().each(function($el,index){
      cy.wrap($el, index).select(this.options3[index])
    })
    bookingPage.getBookButton().click()

    let header1 = ['DEPART', 'RETURN']
    bookingPage.getHeader1().each(($el, index) =>{
      cy.wrap($el, index).should('have.text',header1[index])

    
    })
    let header3 = ['NY to TX', 'TX to NY']

    bookingPage.getHeader3().each(($el, index) =>{
      cy.wrap($el, index).should('have.text',header3[index])
    
  })
  bookingPage.getParagraph().eq(0).invoke(text).then((text) => {
    expect(text.trim()).to.equal('Number of Passengers: 1')
  })
  })
})