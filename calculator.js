function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function operate(num1, operator, num2) {
    if (operator == '/' && num2 == 0) {
        alert('Don\'t divide by zero!');
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        display.textContent = 0;
    } else {
        switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2);
        case '^':
            return power(num1,num2);
        }
    }
    
}

const display = document.querySelector('#screen');
let displayValue = display.textContent; 

let num1;
let num2;
let operator;
let opPressed = false;

const buttons = document.querySelectorAll('.nonop');
buttons.forEach(item => {
    item.addEventListener('click', event => {
        if (display.textContent == 0 && item.textContent !== 'AC' || opPressed == true && item.textContent !== 'AC') {
            display.textContent = item.textContent;
            opPressed = false;
        } else if (item.textContent == 'AC') {
            display.textContent = 0;
            num1 = undefined;
            num2 = undefined;
        }  else if (display.textContent !== 0) {
            if (!(display.textContent.includes('.') && item.textContent == '.') && !(display.textContent.includes('-') && item.textContent == '-')) {
                display.textContent = display.textContent + item.textContent;
            }
            //display.textContent = display.textContent + item.textContent;
        }
    })
})

const opButtons = document.querySelectorAll('.op');
opButtons.forEach(item => {
    item.addEventListener('click', event => {
        if (num1 == undefined) {
            num1 = display.textContent;
            operator = `${item.textContent}`;
            opPressed = true;
        } else if (num1 !== undefined) {
            num2 = display.textContent;
            opPressed = true;
            display.textContent = operate(num1, operator, num2);
            num1 = operate(num1, operator, num2);
            num2 = undefined;
            operator = `${item.textContent}`;
        }
        
    })
})

const equal = document.querySelector('.equal');
equal.addEventListener('click', event => {
    if (num1 !== undefined) {
        num2 = display.textContent;
        display.textContent = operate(num1, operator, num2);
        num1 = undefined;
        num2 = undefined;
        opPressed = true;
    } 
})

window.addEventListener('keydown', function(e) {
    const butt = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(butt)
    butt.click();
})