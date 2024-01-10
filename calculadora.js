document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const controlButtons = document.querySelector('.controls').children;
    const allOperators = ['+', '-', 'x', '/', '='];


    let firstValue = '';
    let secondValue = '';
    let operator = ''; 
    let result = '';
    let isDecimalFirst = false;
    let isDecimalSecond = false;

    const calculate = () => {
        firstValue = parseFloat(firstValue);
        secondValue = parseFloat(secondValue);

        switch (operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case 'x':
                result = firstValue * secondValue;
                break;
            case '/':
                result = firstValue / secondValue;
                break;
        }

        display.innerText = result;
        firstValue = result;
        secondValue = '';
    }

    const backspace = (num) => {
        let backspaceValue = String(num);
        const lastChar = backspaceValue.charAt(backspaceValue.length - 1);

        if (lastChar === '.') {
            if (num === firstValue) {
                isDecimalFirst = false;
            } else if (num === secondValue) {
                isDecimalSecond = false;
            }
        }

        if (backspaceValue.length > 1) {
            backspaceValue = backspaceValue.slice(0,-1);
        } else {
            backspaceValue = '';
        }
        display.innerText = display.innerText.slice(0,-1);

        return backspaceValue;
    }


    for (let button of controlButtons){
        button.addEventListener('click', () => {
            const {innerText: btnValue} = button;
            const btnValueIsOperator = allOperators.includes(btnValue);

            if (!secondValue && btnValue === '=') {
                return null
            }

            if (btnValue === 'C') {
                firstValue = '';
                secondValue = '';
                operator = '';
                isDecimalFirst = false;
                isDecimalSecond = false;
                console.log(`first value: ${firstValue} operator: ${operator} second value: ${secondValue} buttonvalue ${btnValue} result: ${result} decimalFirst: ${isDecimalFirst} decimalSecond: ${isDecimalSecond}`);
                return display.innerText = '';
            }

            if (btnValue === '←') {
                if (secondValue){
                    secondValue = backspace(secondValue);
                } else if (operator && operator !== '=') {
                    operator = backspace(operator);
                } else {
                    firstValue = backspace(firstValue);
                }
                console.log(`first value: ${firstValue} operator: ${operator} second value: ${secondValue} buttonvalue ${btnValue} result: ${result} decimalFirst: ${isDecimalFirst} decimalSecond: ${isDecimalSecond}`);
                return null;
            }

            if (btnValue === '.') {
                if (isDecimalFirst === false || isDecimalSecond === false){
                    if (!secondValue && !operator) {
                        firstValue += btnValue;
                        display.innerText += btnValue;
                        isDecimalFirst = true;
                        console.log(`first value: ${firstValue} operator: ${operator} second value: ${secondValue} buttonvalue ${btnValue} result: ${result} decimalFirst: ${isDecimalFirst} decimalSecond: ${isDecimalSecond}`);
                        return;
                    } else if (firstValue && operator) {
                        secondValue += btnValue;
                        display.innerText += btnValue;
                        isDecimalSecond = true;
                        console.log(`first value: ${firstValue} operator: ${operator} second value: ${secondValue} buttonvalue ${btnValue} result: ${result} decimalFirst: ${isDecimalFirst} decimalSecond: ${isDecimalSecond}`);
                        return;
                    }
                }
                return;
            }

            if (firstValue && btnValueIsOperator) {
                if (secondValue) {
                    calculate();
                    operator = btnValue;
                } else if(operator && operator !== '=') {
                    operator = backspace(operator);
                    operator = btnValue;
                } else {
                    operator = btnValue;
                    isDecimalSecond = false;
                }
            } else if (!operator) {
                firstValue += btnValue;
            } else if (operator) {
                if(result && operator === '=') {
                    firstValue = btnValue;
                    result = '';
                    display.innerText = '';
                    isDecimalFirst = false;
                    isDecimalSecond = false;
                } else {
                    secondValue += btnValue;
                }
            }
            
            if (btnValue !== '=' && btnValue !== '←'){
                display.innerText += btnValue;
            }

            console.log(`first value: ${firstValue} operator: ${operator} second value: ${secondValue} buttonvalue ${btnValue} result: ${result} decimalFirst: ${isDecimalFirst} decimalSecond: ${isDecimalSecond}`);
        }
    )};
});