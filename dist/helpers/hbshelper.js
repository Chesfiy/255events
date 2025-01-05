const helpers = {
    // ifElse:(condition: boolean, valueIfTrue: string, valueIfFalse: string)=>{
    //     return condition ? valueIfTrue : valueIfFalse
    // }
    ifElse: (leftValue, operator, rightValue, valueIfTrue, valueIfFalse) => {
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
    formatPrice: (price, locale = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(price);
    },
    toUpperCase: (str) => {
        return str.toUpperCase();
    },
    // Add more helpers as needed
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US').format(date);
    }
};
export default helpers;
