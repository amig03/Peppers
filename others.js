Math.randInt = function (max) {
	return Math.floor(Math.random() * max);
};

function isOne (num) {
	return num === 1;
}

function drawBlock (ctx, x0, y0, x, y) {
	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'black';
	ctx.fillRect(x0, y0, x, y);
	ctx.strokeRect(x0, y0, x, y);
}

function addListeners() {
	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);
}

function removeListeners() {
	document.removeEventListener('keydown', onKeyDown);
	document.removeEventListener('keyup', onKeyUp);
}
