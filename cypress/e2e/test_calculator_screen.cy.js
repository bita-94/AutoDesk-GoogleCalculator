import calculatorPage from '../pages/calculatorPage'; 
import testData from '../fixtures/calculatorData.json'

const CalculatorPage = new calculatorPage();

describe('Google Calculator Tests using screen', () => {

  beforeEach(() => {
    cy.visit('/search?q=calculator')
  });

  describe('Scientific Notation Tests', () => {
    it('Verify scientific notation when multiplying large numbers', () => {
      const num1 = '81713889254257560000'
      const num2= '2'
      const expectedResult = '1.6342778e+20'
    
      const num1Str = num1.toString();
      for (let i = 0; i < num1Str.length; i++) {
        CalculatorPage.getNumber(num1Str.charAt(i)).click(); // Click each digit of num1
      }
      CalculatorPage.clickOperator('*')
      
      const num2Str = num2.toString();
      for (let i = 0; i < num2Str.length; i++) {
        CalculatorPage.getNumber(num2Str.charAt(i)).click(); // Click each digit of num2
      }
      CalculatorPage.clickEquals()

      CalculatorPage.getDisplay().should('have.text', expectedResult);

    })
  })
  

  describe('Addittion Tests', () => {
    testData.addition.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} + ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })  

  describe('Subtraction Tests', () => {
    testData.subtraction.forEach(({ testcase,num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} - ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })

  describe('Multiplication Tests', () => {
      testData.multiplication.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} × ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  })

  describe('Division Tests', () => {
    testData.division.forEach(({ testcase, num1, operator, num2, expectedResult }) => {
      it(`${testcase}:\n ${num1} ÷ ${num2} = ${expectedResult}`, () => {
        CalculatorPage.performOperation(num1, operator, num2);
        CalculatorPage.getDisplay().should('have.text', expectedResult);
      });
    });
  }) 

  describe('AC/CE Tests', () => {
    it('Verify  the AC (All Clear) button is displayed', () => {
      CalculatorPage.getAllClear().should('be.visible');      
      CalculatorPage.clickAC();
      CalculatorPage.getDisplay().should('have.text', '0');
    });

    it('Verify CE can clear number one by one', () => {
      const randomNumber = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number

      // Enter each digit of the random number
      randomNumber.toString().split('').forEach(digit => {
        CalculatorPage.clickNumber(digit);
      });

      // Verify that the display shows the correct number
      CalculatorPage.getDisplay().should('have.text', randomNumber);

      const numberLength = randomNumber.toString().length;
      for (let i = 0; i < numberLength; i++) {
        CalculatorPage.clickCE();
      }

      CalculatorPage.getDisplay().should('have.text', '0');
    });

    it('Verify AC can clear all', () => {
      const num1 = Math.floor(Math.random() * 10); 
      const num2 = Math.floor(Math.random() * 10);
      const operator = '+';

      CalculatorPage.performOperation(num1, operator, num2);
      CalculatorPage.clickAC();
      CalculatorPage.getDisplay().should('have.text', '0');
    });
  })

});
