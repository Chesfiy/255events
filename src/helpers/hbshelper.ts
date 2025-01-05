const helpers = {

    // ifElse:(condition: boolean, valueIfTrue: string, valueIfFalse: string)=>{
    //     return condition ? valueIfTrue : valueIfFalse
    // }

    ifElse: (
        leftValue: any,
        operator: string,
        rightValue: any,
        valueIfTrue: string,
        valueIfFalse: string
      ) => {
        switch (operator) {
          case '==':
            return leftValue == rightValue ? valueIfTrue : valueIfFalse;
          case '===':
            return leftValue === rightValue ? valueIfTrue : valueIfFalse;
          case '!=':
            return leftValue != rightValue ? valueIfTrue : valueIfFalse;
          case '!==':
            return leftValue !== rightValue ? valueIfTrue : valueIfFalse;
          case '<':
            return leftValue < rightValue ? valueIfTrue : valueIfFalse;
          case '<=':
            return leftValue <= rightValue ? valueIfTrue : valueIfFalse;
          case '>':
            return leftValue > rightValue ? valueIfTrue : valueIfFalse;
          case '>=':
            return leftValue >= rightValue ? valueIfTrue : valueIfFalse;
          default:
            return valueIfFalse; // Default to false if the operator is not recognized
        }
      },

      formatPrice: (price: number, locale: string = 'en-US', currency: string = 'USD') => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
        }).format(price);
      },
    
      toUpperCase: (str: string) => {
        return str.toUpperCase();
      },
    
      // Add more helpers as needed
      formatDate: (date: Date) => {
        return new Intl.DateTimeFormat('en-US').format(date);
      }

}

export default helpers;