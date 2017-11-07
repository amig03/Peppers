Tetris.prototype.draw = function (options) {

// получение параметров из options

	var canvas_id = options.canvas_id;
	var x_cells = options.X_CELLS;
	var y_cells = options.Y_CELLS;
	var dx = options.CELL_WIDTH;
	var dy = options.CELL_HEIGHT;

// расчет размеров в пикселях

	var w = x_cells * dx;
	var h = y_cells * dy;

// получение элемента canvas

	var canvas = document.getElementById(canvas_id);
	var ctx = canvas.getContext('2d');

	canvas.setAttribute('width', w);
	canvas.setAttribute('height', h);

	var scope = this;
	var i = 0;

// очистка canvas, затем отрисовка линий сетки

	ctx.clearRect(0, 0, w, h);

	for (i = 0; i <= w; i += dx) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, h);
	}

	for (i = 0; i <= h; i += dy) {
		ctx.moveTo(0, i);
		ctx.lineTo(w, i);
	}

// задание параметров линий

	ctx.lineWidth = 1;
	ctx.strokeStyle = '#676767';
	ctx.stroke();

	return scope;
}