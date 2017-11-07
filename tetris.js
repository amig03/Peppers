function Tetris (options) {

	var scope = this;
	var w = options.X_CELLS;
	var h = options.Y_CELLS;

// Задание приватных параметров тетриса

	scope.glass = [];
	scope.pressed_keys = [];
	scope.state = "inactive";
	scope.is_paused = false;
	scope.figure_current = '';
	scope.fall_delta = 40;

// Заполнение массива стакана нулями

	for (var i = 0; i <= w; i++) {
		scope.glass[i] = [];
		for (var j = 0; j <= h; j++) {
			scope.glass[i][j] = 0;
		}
	}

//создание 4-x фаз всех фигур

	make_phases(options);

	return scope;
}