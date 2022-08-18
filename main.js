let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".calc_display");
const secondDisplay = document.querySelector(".calc_s_display");

window.addEventListener("click", (e) => {
  if (e.key >= 0 && e.key <= 9) clickNumbers(e.key);
  if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/")
    clickOperators(e.key);
  if (e.key == ".") clickDot(e.key);
  if (e.key == "Enter") clickEqual(e.key);
  if (e.key == "c") clearData();
});

const clickButtons = () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("num")) {
        clickNumbers(button.innerText);
      } else if (button.classList.contains("op")) {
        clickOperators(button.innerText);
      } else if (button.classList.contains("eq")) {
        clickEqual();
        updateDisplay();
        updateSecondDisplay();
      } else if (button.classList.contains("dot")) {
        clickDot(button.innerText);
      } else if (button.classList.contains("clear")) {
        clearData();
      }
    });
  });
};

clickButtons();

const clickNumbers = (number) => {
  if (firstOperand === "" || operator === "") {
    firstOperand += number;
  } else if (firstOperand != "" && operator != "") {
    secondOperand += number;
  }
  updateDisplay();
  updateSecondDisplay();
};

const clickOperators = (operators) => {
  if (firstOperand != "" && operator != "" && secondOperand != "") {
    result = operate(firstOperand, secondOperand, operator);
    firstOperand = roundNumber(result);
    operator = operators;
    secondOperand = "";
  }
  if (firstOperand != "" && operator === "") operator = operators;

  updateDisplay();
  updateSecondDisplay();
};

const clickEqual = () => {
  if (firstOperand != "" && operator != "" && secondOperand != "") {
    result = operate(firstOperand, secondOperand, operator);
    firstOperand = roundNumber(result);
    operator = "";
    secondOperand = "";
  }
  updateDisplay();
  updateSecondDisplay();
};

const updateDisplay = () => {
  if (firstOperand != "") {
    display.textContent = firstOperand;
  } else if (firstOperand === "") {
    display.textContent = "0";
  }
  if (secondOperand != "") display.textContent = secondOperand;
  if ((result != "" || result === 0) && secondOperand === "")
    display.textContent = roundNumber(result);
  if (result === Infinity) display.textContent = "clear";
};

const clickDot = (dot) => {
  if (
    !display.textContent.includes(".") &&
    firstOperand != "" &&
    operator === ""
  ) {
    firstOperand += dot;
  }
  if (!display.textContent.includes(".") && secondOperand != "") {
    secondOperand += dot;
  }
  updateDisplay();
  updateSecondDisplay();
};

const updateSecondDisplay = () => {
  if (firstOperand != "" && operator != "" && secondOperand === "") {
    secondDisplay.textContent = firstOperand + operator;
  } else if (firstOperand != "" && operator != "" && secondOperand != "") {
    secondDisplay.textContent = firstOperand + operator + secondOperand;
  }
};

const clearData = () => {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  result = "";
  displayValue = "";
  display.textContent = "0";
  secondDisplay.textContent = "";
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (firstOperand, secondOperand, operator) => {
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
  }
};

const roundNumber = (result) => {
  return Math.round((result + Number.EPSILON) * 1000) / 1000;
};