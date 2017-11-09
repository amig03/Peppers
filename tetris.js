function Tetris (options) {

	var scope = this;

	var dx = options.CELL_WIDTH;
	var dy = options.CELL_HEIGHT;

	var x_cells = options.X_CELLS;
	var y_cells = options.Y_CELLS;

	var i, j;

	var back = document.getElementById("back");
	var message = document.getElementById("message");
	
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
	scope.fall_delta = options.fall_delta;

// Заполнение массива стакана нулями

	for (i = 0; i <= y_cells - 1; i++) {
		scope.glass[i] = [];
		for (j = 0; j <= x_cells - 1; j++) {
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

		var i, j;

		var k = scope.pressed_keys;
		var ph = scope.figure_current.phase;
		var link = scope.figure_current.link;

		var x0 = scope.figure_current.position[0];
		var y0 = scope.figure_current.position[1];

		// var fig_arr = figures[link][ph];
		var new_ph = (ph === 3) ? 0 : ph + 1;
		// console.log(ph, new_ph);

		// var x_cells_length = figures[link][ph][0].length;
		// var y_cells_length = figures[link][ph].length;

		var check_fall = new Date();

		if (check_fall - start_step >= scope.fall_delta) {
			// console.log(moveFigure(link, x0, y0 + dy));
			if (moveFigure(link, x0, y0 + dy)) {
				
				// drawFigure(ctx_fig, figures[link][ph], x0, y0 + dy);
				scope.figure_current.position[1] += dy;
				start_step = new Date();

			} else {
				figureToGlass(x0, y0);
				createFigure();
				return;
			}
		}

		if (!(k.left && k.right)) {

			if (k.left && moveFigure(link, x0 - dx, y0)) {
				
				scope.figure_current.position[0] -= dx;

			} else if (k.right && moveFigure(link, x0 + dx, y0)) {
				
				scope.figure_current.position[0] += dx;

			}

			if (k.up && moveFigure(link, x0, y0, new_ph)) {
				k.up = false;
			}

			if (k.down) {
				scope.fall_delta /= 2;
			} else {
				scope.fall_delta = options.fall_delta;
			}

			if (k.space) {
				k.space = false;
				dropFigure(link, x0, y0);
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
		if (moveFigure(link, pos[0], pos[1])) {
			drawFigure(ctx_fig, figures[link][ph], pos[0], pos[1]);
		} else {
			gameOver();
		}
	}

// Метод отрисовки фигуры

	function drawFigure (ctx, arr, x0, y0) {
		
		var i, j;

		if (ctx == ctx_fig) ctx.clearRect(0, 0, w, h);
		// console.log(ctx);

		for (i = 0; i < arr.length; i++) {
			var y = y0 + dy * i;

			for (j = 0; j < arr[i].length; j++) {
				if (arr[i][j] === 1) {
					var x = x0 + dx * j;
					drawBlock(ctx, x, y, dx, dy);
				}
			}
		}
	}

	// Метод, разрешающий перемещение фигуры

	function moveFigure(link, x0, y0, ph) {
		
		var i, j;

		// var link = scope.figure_current.link;
		if (ph === undefined) {
			ph = scope.figure_current.phase;
		}

		var fig_arr = figures[link][ph];

		// var pos = scope.figure_current.position;

		// var fig_arr = figures[link][ph];

		var x_length = fig_arr[0].length;
		var y_length = fig_arr.length;

		var x_cell = x0/dx;
		var y_cell = y0/dy;

		try {
			for (i = y_cell; i < y_cell + y_length; i++) {
				for (j = x_cell; j < x_cell + x_length; j++) {
					if (fig_arr[i - y_cell][j - x_cell] === 1 && scope.glass[i][j] === 1 || scope.glass[i][j] == undefined) {
						return false;
					}
				}
			}
		} catch (err) {return false;}

		drawFigure(ctx_fig, figures[link][ph], x0, y0);

		scope.figure_current.phase = ph;

		return true;		
	}

	function dropFigure (link, x_cur, y_cur) {
		
		var i;

		for (i = y_cur/dy; i < y_cells; i++) {
			y_cur = i * dy;
			var y_next = (i + 1) * dy;

			if (!moveFigure(link, x_cur, y_next)) {
				scope.figure_current.position[1] = y_cur;
				figureToGlass(x_cur, y_cur);
				createFigure();
				return;
			} 
		}
	}

	function figureToGlass (x0, y0) {

		var i, j;

		x0 /= dx;
		y0 /= dy;

		var link = scope.figure_current.link;
		var ph = scope.figure_current.phase;
		var pos = scope.figure_current.position;
		// console.log(pos[1]);

		var fig_arr = figures[link][ph];

		// Рисуем блок в месте размещения фигуры

		drawFigure(ctx_glass, fig_arr, pos[0], pos[1]);
		// console.log(fig_arr);
		for (i = y0; i < y0 + fig_arr.length; i++) {
			// console.log(i);
			for (j = x0; j < x0 + fig_arr[i - y0].length; j++) {
				if (fig_arr[i - y0][j - x0] === 1) {
					scope.glass[i][j] = 1;
				}
			}
		}

		checkFilledRows();

		// for (i = 0; i <= y_cells - 1; i++) {
		// 	console.log(scope.glass[i]);
		// }
	}

	function checkFilledRows() {
		// Определяем массив, в который будут помещаться индексы заполненных строк стакана

		var i, j;

		var delete_rows = [];
		var deleting = false;

		// Заполняем этот массив

		for (i = 0; i <= y_cells - 1; i++) {
			// console.log(scope.glass[i]);
			if (scope.glass[i].every(isOne)) {
				delete_rows.push(i);
				deleting = true;
			}
		}

		if (deleting === false) return;

		// В j записываем число строк стакана. Далее смещаем строки, которые не будут удаляться, вниз.

		j = y_cells - 1;

		for (i = y_cells - 1; i >=0; i--) {
			if (delete_rows.indexOf(i) === -1) {
				scope.glass[j] = scope.glass[i];
				j--;
			}
		}

		// Если мы остановились не на нулевой строке, то все вышестоящие строки стакана заполняем нулями, т.к. все что нужно - переместилось.
		
		if (j >= 0) {
			for (i = 0; i <= j; i++) {
				scope.glass[i].map(function() {
					return 0;
				});
			}
		}
		
		// Очищаем CANVAS стакана и перерисовываем его.

		ctx_glass.clearRect(0, 0, w, h);

		for (i = 0; i <= y_cells - 1; i++) {
			for (j = 0; j <= x_cells - 1; j++) {
				console.log(scope.glass[i]);
				if (scope.glass[i][j] === 1) {
					drawBlock(ctx_glass, j * dx, i * dy, dx, dy);
				}
			}
		}
	}

	function gameOver () {
		clearInterval(gameInterval);
		document.removeEventListener('keydown', onKeyDown);
		document.removeEventListener('keyup', onKeyUp);
		scope.state = 'gameover';
		message.innerHTML = "Game Over";
	}

	function Pausing () {
		if (scope.is_paused) {
			clearInterval(gameInterval);
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		} else {
			gameInterval = setInterval(gameStep, 40);
			document.addEventListener('keydown', onKeyDown);
			document.addEventListener('keyup', onKeyUp);
		}
	}

//создание 4-x фаз всех фигур
	
	make_figures(options);
	
	var start_step = new Date();
	createFigure();

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	// document.onkeydown = onKeyDown;
	// document.onkeyup = onKeyUp;

	var gameInterval = setInterval(gameStep, 40);

	return scope;
}
