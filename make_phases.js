// функция создает четыре фазы для фигур

function make_phases(ob) {

	var fig = ob.figures;

	var phases = {
		p1: [],
		p2: [],
		p3: [],
		p4: []
	};

// получение массивов из строки вида "0,1,1;0,1,0"

	fig.forEach(function(item, i) {
		var arr = item.split(';');

		arr.forEach(function(item, i) {
				arr[i] = item.split(',');
		});

		phases.p1.push(arr);

	});

/* для каждой предыдущей фазы производится поворот фигуры на 90 градусов по часовой стрелке и затем полученные значение записываются в следующую фазу
	например:
			(*) -->
	 ^ 		[0, 1, 0]
	 | 		[1, 1, 1]
	 (**)

(*) внешинй цикл - движение слева направо
(**) внутренний цикл - движение снизу вверх и извлечение элементов

Таким образом, получаем следующий массив для второй фазы:

[1, 0]
[1, 1]
[1, 0]

*/

	for (var i = 2; i <= 4; i++) {
		var k = i - 1;
		var cur_ph = phases['p' + i];
		var prev_ph = phases['p' + k];

		prev_ph.forEach(function(item, i) {
			var arr = [];
			var row = [];

			for (var j = 0; j < prev_ph[i][0].length; j++) {
				for (var u = prev_ph[i].length - 1; u >= 0; u--) {
					row.push(prev_ph[i][u][j]);
				}
				arr.push(row);
				row = [];
			}

			cur_ph.push(arr);
			arr = [];
		})
	}
	console.log(phases);
}