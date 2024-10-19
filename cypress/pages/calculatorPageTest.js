class CalculatorPage {

  getNumber(element) {
      return cy.get('.card-section').contains(element)
    }

    clickNumber(element) {
      this.getNumber(element).click({force: true});
    }

    getOperator(operator) {
      return cy.get(`[aria-label="${operator}"]`)
    }

    clickOperator(operator) {
      switch (operator) {
        case '+':
          this.getOperator('plus').click({force: true});
          break;
        case '-':
          this.getOperator('minus').click({force: true});
          break;
        case '*':
          this.getOperator('multiply').click({force: true});
          break;
        case '/':
          this.getOperator('divide').click({force: true});
          break;
        default:
          break;
      }
    }  

    clickEquals(){
      this.getOperator('equals').click({force: true})
    }

    getDisplay(){
      return cy.get('#cwos')
    }

    performOperation(num1, operator, num2) {
      // Handle negative numbers by clicking the minus button first
      if (num1 < 0) {
        this.clickOperator('-');
        this.clickNumber(Math.abs(num1)); // Use the absolute value of num1
      } else {
        this.clickNumber(num1);
      }
  
      this.clickOperator(operator);
  
      if (num2 < 0) {
        this.clickOperator('-');
        this.clickNumber(Math.abs(num2)); // Use the absolute value of num2
      } else {
        this.clickNumber(num2);
      }
  
      this.clickEquals();
    }
  


  
    // getClearEntry() {
    //   return cy.get('div[jsname="H7sWPd"]');
    // }
  
    // getAllClear() {
    //   return cy.get('div[jsname="SLn8gc"]');
    // }
  
    getDivide() {
      return cy.get('div[jsname="WxTTNd"]');
    }
  
    getMultiply() {
      return cy.get('div[jsname="YovRWb"]');
    }
  
    getSubtract() {
      return cy.get('div[jsname="pPHzQc"]');
    }
  
    getAdd() {
      return cy.get('div[jsname="XSr6wc"]');
    }
  
    getEquals() {
      return cy.get('div[jsname="Pt8tGc"]');
    }
  
    getDecimal() {
      return cy.get('div[jsname="YrdHyf"]');
    }
  
    // Number buttons
    getNumber(num) {
      return cy.get(`div[jsname="${this.getNumberJsName(num)}"]`);
    }
  
    // Helper method to get jsname for numbers
    getNumberJsName(num) {
      const numMap = {
        '0': 'bkEvMb',
        '1': 'N10B9',
        '2': 'lVjWed',
        '3': 'KN1kY',
        '4': 'xAP7E',
        '5': 'Ax5wH',
        '6': 'abcgof',
        '7': 'rk7bOd',
        '8': 'T7PMFe',
        '9': 'XoxYJ',
      };
      return numMap[num];
    }
  }
  
  export default CalculatorPage;
  