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
        // we converted the number to a string and get the last value from the string 
        // using the slice method
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNember(number) {
        if (number === "." && this.currentOperand.includes(".")) return;   // but the period is gonna be added multiple time that's why we did this , so we're just stop

        // we converted everything into a string because js will try to add the number , ex = you wanna type 123 , so if you clicked on 1 then 2 js will try to add them and not make them like a string 
        this.currentOperand = this.currentOperand.toString() + number.toString();


    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        this.operation = operation;
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.previousOperand = this.currentOperand;// here when we chose an operation it'll make the current operand instead of the previous operand
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return; // here if the user dont enter a number , we should make sure that the code wont run

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDegits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDegits != null) {
            return `${integerDisplay}.${decimalDegits}`
        } else {
            return integerDisplay;
        }
    }


    updateDisplay() { // update the values inside of our output

        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {// if we have an operation , and it's not equal to null 
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }


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


equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
