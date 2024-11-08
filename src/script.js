let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let resultDisplayed = false;

function pressKey(key) {
    const display = document.getElementById('display');

    if (resultDisplayed) {
        displayValue = '';
        resultDisplayed = false;
    }

    if (key === '.' || key === ',') {
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (firstOperand === null && displayValue !== '') {
            firstOperand = parseFloat(displayValue);
            currentOperator = key;
            displayValue = '';
            updateDisplay(firstOperand + ' ' + key);
        } else if (currentOperator && displayValue !== '') {
            secondOperand = parseFloat(displayValue);
            let result = performCalculation(firstOperand, secondOperand, currentOperator);
            updateDisplay(result + ' ' + key);
            firstOperand = result;
            currentOperator = key;
            displayValue = '';
        } else {
            currentOperator = key;
            updateDisplay(firstOperand + ' ' + key);
        }
    } else {
        displayValue += key;
        updateDisplay(displayValue);
    }
}

function calculate() {
    if (firstOperand !== null && currentOperator && displayValue !== '') {
        secondOperand = parseFloat(displayValue);
        let result = performCalculation(firstOperand, secondOperand, currentOperator);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        updateDisplay(result);
        resetCalculator();
        displayValue = result.toString();
        resultDisplayed = true;
    }
}

function performCalculation(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Помилка';
            } else {
                return a / b;
            }
        default:
            return 0;
    }
}

function clearDisplay() {
    resetCalculator();
    updateDisplay('0');
}

function resetCalculator() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    resultDisplayed = false;
}

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
}
