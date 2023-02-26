let operation = [undefined, undefined , undefined];
let shouldChange = false; //tracks whether last click was of an operand
const add = (a,b) => parseInt(a) + parseInt(b);
const substract = (a,b) => parseInt(a) - parseInt(b);
const multiply = (a,b) => a * b;
const divide = (a, b) => a / b;
function operate(operator, a, b){
    switch(operator){
        case("+"):
            return add(a,b);
            break;
        case("-"):
            return substract(a, b);
            break;
        case("*"):
            return multiply(a, b);
            break;
        case("/"):
            if (b == 0){return "Can't divide by zero"}
            return divide(a, b);
            break;
    }
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (display.textContent === "0" || display.textContent === "Can't divide by zero" || shouldChange){
            display.textContent = e.target.textContent;
            shouldChange = false;
        } else { display.textContent = display.textContent + e.target.textContent};
    })
})

const erase = document.querySelector("#delete");
const turn = document.querySelector("#turn");
const percentage = document.querySelector("#percentage");
const dot = document.querySelector("#dot");

erase.addEventListener("click", () => {
    display.textContent = 0;
    operation = [undefined, undefined , undefined];
});
turn.addEventListener("click", () => {
    display.textContent *= -1;
});
percentage.addEventListener("click", () => {
    display.textContent *= .1;

});
dot.addEventListener("click", () => {
    if(!display.textContent.includes(".")){
        display.textContent += ".";
}})

const operator = document.querySelectorAll(".operator");

operator.forEach(operand => {
    operand.addEventListener("click", (e) => {
        if (e.target.textContent == "=" && !operation.includes(undefined) && shouldChange && !operation.includes("")){
            display.textContent = operate(...operation);
            operation = [undefined, display.textContent , undefined];
            shouldChange = true;
        } else if (!operation.includes("")){
            if (operation[1] === undefined || operation[1] !== display.textContent && !operation.includes(undefined)) {
                operation[1] = display.textContent;
                shouldChange = true;
            } else if (operation[2] === undefined && operation[0] !== undefined) {
                operation[2] = display.textContent
                shouldChange = true;
            }
            if(!operation.includes(undefined)){
                display.textContent = operate(...operation);
                operation[1] = display.textContent;
                operation[2] = undefined;
                shouldChange = true;
            }
        }
        sign = e.target.textContent;
        operation[0] = sign !== "=" ? sign : undefined;
        console.log(operation);
    })
})
