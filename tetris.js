function Tetris (options) {

	var scope = this;

	var dx = options.CELL_WIDTH;
	var dy = options.CELL_HEIGHT;

	var x_cells = options.X_CELLS;
	var y_cells = options.Y_CELLS;

	var i, j;

// Задание параметров тетриса

	scope.glass = [];
	scope.pressed_keys = {
		left: false,
		right: false,
		up: false,
		down: false,
		space: false
	};
	scope.state = "inactive";
	scope.is_paused = false;
	scope.figure_current = {
		link: '',
		position: [],
		phase: ''
	};
	scope.fall_delta = 1000;

// Заполнение массива стакана нулями

	for (i = 0; i <= x_cells - 1; i++) {
		scope.glass[i] = [];
		for (j = 0; j <= y_cells - 1; j++) {
			scope.glass[i][j] = 0;
		}
	}

// расчет размеров в пикселях

	var w = x_cells * dx;
	var h = y_cells * dy;

// Получение слоев canvas - фигур и стакана

	var canvas_figures = document.getElementById(options.canvas_figuresID);
	var ctx_fig = canvas_figures.getContext('2d');

	var canvas_glass = document.getElementById(options.canvas_glassID);
	var ctx_glass = canvas_glass.getContext('2d');

// Установка размеров игровой области

	var game_area = document.getElementsByClassName(options.canvas_class);

	for (var i = 0; i < game_area.length; i++) {
		game_area[i].setAttribute('width', w);
		game_area[i].setAttribute('height', h);
	}

	document.getElementById(options.canvas_containerID).style.width = w + 'px';
	document.getElementById(options.canvas_containerID).style.height = h + 'px';

// Приватные методы

	function gameStep () {
		var k = scope.pressed_keys;
		var ph = scope.figure_current.phase;
		var link = scope.figure_current.link;

		var x0 = scope.figure_current.position[0];
		var y0 = scope.figure_current.position[1];

		var x_cells_length = figures[link][ph][0].length;
		var y_cells_length = figures[link][ph].length;

		if (!(k.left && k.right)) {

			if (k.left && testOffset(x0 - dx, y0, x_cells_length, y_cells_length)) {
				
				scope.figure_current.position[0] -= dx;
				drawFigure(figures[link][ph], x0 - dx, y0);

			} else if (k.right && testOffset(x0 + dx, y0, x_cells_length, y_cells_length)) {
				
				scope.figure_current.position[0] += dx;
				drawFigure(figures[link][ph], x0 + dx, y0);

			}
		}
	}

// Метод создания фигуры

	function createFigure () {

		var rand_fig;
		var rand_phase;

		rand_fig = Math.randInt(figures.length);
		rand_phase = Math.randInt(4);

		var link = scope.figure_current.link = rand_fig;
		var ph = scope.figure_current.phase = rand_phase;
		var pos = scope.figure_current.position = [Math.floor(w/2), 0];
		drawFigure(figures[link][ph], pos[0], pos[1]);
	}

// Метод отрисовки фигуры

	function drawFigure (arr, x0, y0) {
		
		ctx_fig.clearRect(0, 0, w, h);
		ctx_fig.fillStyle = 'black';

		for (i = 0; i < arr.length; i++) {
			var y = y0 + dy * i;

			for (j = 0; j < arr[i].length; j++) {
				if (arr[i][j] === 1) {
					var x = x0 + dx * j;
					ctx_fig.strokeRect(x, y, dx, dy);
					ctx_fig.fillRect(x, y, dx, dy);
				}
			}
		}
	}

// Метод, разрешающий перемещение фигуры

	function testOffset(x0, y0, x_length, y_length) {
		x0 /= dx;
		y0 /= dy;

		try {
			for (i = y0; i < y0 + y_length; i++) {
				for (j = x0; j < x0 + x_length; j++) {
					if (scope.glass[j][i] === 1) {
						return false;
					}
				}
			}
		} catch (e) {return false;}

		return true;		
	}

//создание 4-x фаз всех фигур
	
	make_figures(options);
	createFigure();

	document.onkeydown = onKeyDown;
	document.onkeyup = onKeyUp;

	setInterval(gameStep, 100);

	return scope;
}
