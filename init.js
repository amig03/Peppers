// Задание параметров тетриса: количество ячеек по горизонтали, вертикали, фигуры, HTML ID canvas'а.

function init() {
	var options = {
		X_CELLS: 10,
		Y_CELLS: 20,
		CELL_WIDTH: 40,
		CELL_HEIGHT: 40,
		figures: ["1", "1,1", "1,1,1", "1,1,1,1", "0,0,1;1,1,1", "1,0,0;1,1,1", "0,1,1;1,1,0", "1,1,0;0,1,1", "0,1,0;1,1,1", "1,1;1,1"],
		canvas_id: "Tetris"
	}

	tetris = new Tetris(options);
	tetris.draw(options);
	//tetris.startGame();
	//tetris.pauseGame();
	
}