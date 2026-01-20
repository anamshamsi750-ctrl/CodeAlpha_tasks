const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay(value) {
    display.textContent = value;
}

function clear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    
    // Agar currentInput empty hai, toh previousInput use karo (e.g., 5 + = karne par 5 + 5)
    if (isNaN(current) || currentInput === '') {
        current = prev;
    }
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                updateDisplay('Error');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.id;
        if (button.classList.contains('number')) {
            if (currentInput === '0' && value !== 'decimal') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay(currentInput);
        } else if (button.classList.contains('operator')) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = value;  // Yeh 'add', 'subtract', etc. set karega
            previousInput = currentInput;
            currentInput = '';
        } else if (value === 'equals') {
            if (operator !== '' && previousInput !== '') {
                calculate();
            }
        } else if (value === 'clear') {
            clear();
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        document.getElementById(key).click();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        document.getElementById(key === '*' ? 'multiply' : key === '/' ? 'divide' : key === '+' ? 'add' : 'subtract').click();
    } else if (key === 'Enter') {
        document.getElementById('equals').click();
    } else if (key === 'Escape') {
        document.getElementById('clear').click();
    } else if (key === '.') {
        document.getElementById('decimal').click();
    }
});