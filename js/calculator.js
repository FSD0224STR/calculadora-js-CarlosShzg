

let displayValue = '0';

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendSymbol(symbol) {
    if (displayValue !== 'Error') {
        const lastChar = displayValue.slice(-1);
        if (symbol === '.' && lastChar === '.') {
            // Con esto evitamos agregar dos puntos decimales consecutivos
            return;
        }
        if (isOperator(lastChar) && symbol === '.') {
            // con esto agregamos un cero antes del punto decimal si el último carácter es un operador
            displayValue += '0';
        }
        displayValue += symbol;
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function deleteDigit() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        const result = evaluateExpression(displayValue);
        displayValue = result.toString();
    } catch (error) {
        displayValue = 'Error';
    }
    updateDisplay();
}

function evaluateExpression(expression) {
    try {
        return Function('"use strict";return (' + expression + ')')();
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

updateDisplay();