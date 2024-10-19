class calculatorPage {

  calcultor_card(){
    return cy.get('.card-section')
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


  // Number buttons
  getNumber(num) {
    return cy.get(`div[jsname="${this.getNumberJsName(num)}"]`);
  }

  clickNumber(num){
    this.getNumber(num).click({force:true})
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
      '.': 'YrdHyf',
    };
    return numMap[num];
  }


  performOperation(num1, operator, num2) {
      // Convert numbers to string for iteration
      const strNum1 = num1.toString();
      const strNum2 = num2.toString();
  
      // Handle negative numbers by clicking the minus button first
      if (strNum1.startsWith('-')) {
          this.clickOperator('-');
          strNum1.slice(1).split('').forEach(digit => {
              this.clickNumber(digit);
          });
      } else {
          strNum1.split('').forEach(digit => {
              this.clickNumber(digit);
          });
      }
  
      this.clickOperator(operator);
  
      if (strNum2.startsWith('-')) {
          this.clickOperator('-');
          strNum2.slice(1).split('').forEach(digit => {
              this.clickNumber(digit);
          });
      } else {
          strNum2.split('').forEach(digit => {
              this.clickNumber(digit);
          });
      }
  
      this.clickEquals();
  }

  performOperation_keyboard(num1, operator, num2) {
    this.getDisplay().click({force:true});
    this.getDisplay().type(num1);
    this.getDisplay().click({force:true});
    this.getDisplay().type(operator);
    this.getDisplay().type(num2);
    this.getDisplay().type('{enter}');
  }

  getAllClear(){
    return cy.get('[aria-label="all clear"]')
  }

  clickAC() {
    this.getAllClear().contains('AC').click({ force: true });
}

  getClearEntry(){
    return cy.get('[aria-label="clear entry"]')
  }

  clickCE(){
    this.getClearEntry().contains('CE').click({force: true})
  }

}
  
export default calculatorPage;
  