import calculatorPage from '../pages/calculatorPage'; 
import testData from '../fixtures/calculatorData.json'

const CalculatorPage = new calculatorPage();

describe('Google Calculator Tests using keyboard', () => {

  beforeEach(() => {
    cy.visit('/search?q=calculator')

  });

  const generateRandomNumber = (digits) => {
    let number = '';
    for (let i = 0; i < digits; i++) {
        number += Math.floor(Math.random() * 10).toString(); // Append random digits (0-9)
    }
    return number;
};

  describe('Scientific Notation Tests', () => {
    it('Verify scientific notation when multiplying large numbers', () => {
      const num1 = '73093985027097859828031272874866328403517465920935'; 
      const num2 = '44856985850714490383'; 
      const expectedResult = '3.2787759e+69'
      CalculatorPage.performOperation_keyboard(num1, '*', num2);
      CalculatorPage.getDisplay().should('have.text', expectedResult);
    });
  })



  describe('Addittion Tests', () => {
    testData.addition.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} + ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation_keyboard(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })  

  describe('Subtraction Tests', () => {
    testData.subtraction.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} - ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation_keyboard(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })

  describe('Multiplication Tests', () => {
    testData.multiplication.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} × ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation_keyboard(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })

  describe('Division Tests', () => {
    testData.division.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} ÷ ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation_keyboard(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })

  describe('AC/CE Tests', () => {
    it('Verify Backspace can clear digits', () => {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      CalculatorPage.getDisplay().type(randomNumber);

      const numberLength = randomNumber.toString().length;
      for (let i = 0; i < numberLength; i++) {
        CalculatorPage.getDisplay().type('{backspace}');
      }
      CalculatorPage.getDisplay().should('have.text', '0');
    });
    it('Verify Backspace can do All Clear', () => {
      const num1 = Math.floor(Math.random() * 10); 
      const num2 = Math.floor(Math.random() * 10);
      const operator = '+';

      CalculatorPage.performOperation_keyboard(num1, operator, num2);
      CalculatorPage.getDisplay().type('{backspace}');
      CalculatorPage.getDisplay().should('have.text', '0');
    });

   
  })

})