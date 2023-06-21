let x = '';
let y = '';
let operator = '';

const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".button");
const btnDigits = document.querySelectorAll(".digit")
const btnOperators = document.querySelectorAll(".operator");
const btnEquals = document.querySelector("#equals");
const btnClear = document.querySelector("#clear");
const maxDigits = 10;

function clear() {
	x = y = operator = '';
	screen.textContent = '0';
}

function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return (y === 0) ? "err" : (x / y);
}

function operate() {
	const operations = {
			"add" 		: add,
			"subtract" 	: subtract,
			"multiply" 	: multiply,
			"divide" 	: divide
	};
	const X = parseInt(x);
	const Y = parseInt(y);
	let ans = operations[operator](X, Y);

	ans = parseFloat(ans).toFixed(maxDigits - 2);
	ans = Math.round(ans);
	return ans;
}


// create a visual effect of buttons being physically pressed
buttons.forEach((button) => {
	button.addEventListener("mousedown", (e) => {
		e.target.classList.add("pressed");
	});
	button.addEventListener("mouseup", (e) => {
		e.target.classList.remove("pressed");	
	});
	button.addEventListener("mouseout", (e) => {
		e.target.classList.remove("pressed");	
	});
});

btnDigits.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (screen.textContent.length < maxDigits) {
				if (operator === '') {
					x += e.target.id;
					screen.textContent = parseInt(x); // strips leading zeros
				}
				else { 
					y += e.target.id;
					screen.textContent = parseInt(y);
				}
		}
	});
});

btnOperators.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (operator !== '') {  // a second operator is entered
			x = screen.textContent = operate();
			y = '';
		}
		if (x !== '')
			operator = e.target.id;
	});
});

btnEquals.addEventListener("click", () => {
	if (x !== '' && operator === '')
		screen.textContent = x;
    else if (x !== '' && y !== '' && operator !== '')
		screen.textContent = operate();
	else if (operator !== '' && y === '')
		screen.textContent = "err";

	x = y = operator = '';
});

btnClear.addEventListener("click", clear);
