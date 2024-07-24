document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const clear = () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
    };

    const calculate = () => {
        if (operator && previousInput) {
            const prev = parseFloat(previousInput);
            const curr = parseFloat(currentInput);

            switch (operator) {
                case '+': currentInput = (prev + curr).toString(); break;
                case '-': currentInput = (prev - curr).toString(); break;
                case '*': currentInput = (prev * curr).toString(); break;
                case '/': currentInput = (prev / curr).toString(); break;
                default: return;
            }

            operator = '';
            previousInput = '';
            updateDisplay();
        }
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay();
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            }
        });
    });
});
