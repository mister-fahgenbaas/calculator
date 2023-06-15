let x = '';
let y = '';
let operator = '';

screen = document.querySelector("#screen");
buttons = document.querySelectorAll(".button");
btnDigits = document.querySelectorAll(".digit")
btnOperators = document.querySelectorAll(".operator");
btnEquals = document.querySelector("#equals");
btnClear = document.querySelector("#clear");

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
	screen.textContent = operations[operator](X, Y);
	x = y = operator = '';
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
		if (operator === '') {
			x += e.target.id;
			screen.textContent = parseInt(x); // strips leading zeros
		}
		else { 
			y += e.target.id;
			screen.textContent = parseInt(y);
		}
	});
});

btnOperators.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (x !== '')
			operator = e.target.id;
	});
});

btnEquals.addEventListener("click", () => {
	if (x !== '' && y !== '' && operator !== '')
		operate();
});

btnClear.addEventListener("click", clear);
