const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button");
let displayValue = 0;
let lhs, rhs, op;
let input = [];
ops = {
		'add'		: add,
		'subtract'	: subtract,
		'multiply'	: multiply,
		'divide'	: divide,
		'evaluate'	: evaluate
};


function clearScreen() {
	screen.textContent = '0';
}
function clearInputQueue() {
	input = [];
}	

function add(x, y) {
	return x + y;
}

function negate(x) {
	return -1 * x;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	if (y === 0) {
		clearScreen();
		screen.textContent = "err";
	}
	return x / y;
}

function subtract(x, y) {
	return x - y;
}

function evaluate() {
	// don't do anything if input queue is empty
	if (input.length === 0)
		return; 
	
	for (let i = 0; i < input.length; ++i) {
		if (!parseInt(input[i])) {  // if not a number, i.e. it's an operator
			lhs = parseInt(input.slice(0, i).join(''));
			rhs = parseInt(input.slice(i + 1).join(''));
			op = input[i];
			break;
		}
	}	
	// perform the evaluation
	console.log(op, ops[op], lhs, rhs);
	console.log(ops[op](lhs, rhs));
	input = [];
}

function updateScreen() {
	screen.textContent = input.join(' ');
}


buttons.forEach((button) => {
	// Highlight buttons when pressed. Remove highlight when released
	button.addEventListener("mousedown", (e) => {
		e.target.classList.add("pressed");
	});
	button.addEventListener("mouseup", (e) => {
		e.target.classList.remove("pressed");	
	});
	button.addEventListener("mouseout", (e) => {
		e.target.classList.remove("pressed");	
	});

	// calculate logic depending on input
	button.addEventListener("click", (e) => {
		if (e.target.id === 'clear') {
			clearScreen();
			clearInputQueue();    // clear the input queue
			return;
		}
		else if (e.target.id === 'evaluate') {
			evaluate(input);
			clearScreen();
			clearInputQueue();
			return;
		}
		input.push(e.target.id);
		updateScreen();
	});

});




