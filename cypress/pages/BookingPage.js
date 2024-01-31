class BookingPage {
    getRadioButton() {
        return cy.get('.mr-1')
    }

    getLabels() {
        return cy.get('.field>.label')
    }
    getDropdowns() {
        return cy.get('.select > select')
    }

    getDateInput() {
        return cy.get('input[type="text"]')
    }

    getDatePicker() {
        return cy.get('.react-datepicker ')
    }

    getBookButton() {
        return cy.get('.null')
    }

    getParagraph() {
        return cy.get('.mt-4 >p')
    }

    getHeader1(){
        return cy.get('.is-underlined')
    }

    getHeader3(){
        return cy.get('.is-italic')
    }
}

export default BookingPage