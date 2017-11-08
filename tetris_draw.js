Tetris.prototype.drawCells = function (options) {

// получение параметров из options

	var canvas_gridID = options.canvas_gridID;
	var x_cells = options.X_CELLS;
	var y_cells = options.Y_CELLS;
	var dx = options.CELL_WIDTH;
	var dy = options.CELL_HEIGHT;

// расчет размеров в пикселях

	var w = x_cells * dx;
	var h = y_cells * dy;

// получение элемента canvas

	var canvas = document.getElementById(canvas_gridID);
	var ctx = canvas.getContext('2d');

	var i = 0;

// очистка canvas, затем отрисовка линий сетки

	ctx.clearRect(0, 0, w, h);

	// ctx.fillStyle = '#676767';
	// ctx.fillRect(0,0,w,h);

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
	ctx.strokeStyle = 'white';
	ctx.stroke();

	// var canvas_figures = document.getElementById(options.canvas_figuresID);
	// var ctx_fig = canvas_figures.getContext('2d');

	// ctx_fig.clearRect(0, 0, 400, 800);
	// ctx_fig.fillStyle = 'green';
	// ctx_fig.fillRect(10, 10, 10, 10);

}
