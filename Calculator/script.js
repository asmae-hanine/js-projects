class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }


    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operaion = undefined
    }


    delete() {

    }

    appendNember(number) {
        if (number === "." && this.currentOperand.includes(".")) return;   // but the period is gonna be added multiple time that's why we did this , so we're just stop

        // we converted everything into a string because js will try to add the number , ex = you wanna type 123 , so if you clicked on 1 then 2 js will try to add them and not make them like a string 
        this.currentOperand = this.currentOperand.toString() + number.toString();


    }

    chooseOperation(operation) {
        this.operation = operation;
        this.previousOperand = this.currentOperand;// here when we chose an operation it'll make the current operation instead of the previous operation
        this.currentOperand = "";
    }

    compute() {

    }

    updateDisplay() { // update the values inside of our output
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNember(button.innerText);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})