import calculatorPage from '../pages/calculatorPage'; 

const CalculatorPage = new calculatorPage();

describe('Google Calculator Tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

    it('Verify calculator search and all the buttons are present ', () => {
        const search_item = 'Calculator'
        cy.searchFor(search_item)
        cy.url().should('include', `/search?q=${search_item}`);

        // Store the calculator card element in a variable
        const calculatorCard = CalculatorPage.calcultor_card();
        
        // List of expected texts
        const expectedTexts = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            '+', '−', '=', '÷', '×', 'AC', '.'
        ];
        
        // Verify that each expected text is contained in the calculator card
        expectedTexts.forEach(text => {
            calculatorCard.should('contain.text', text);
        });
       
    });


})