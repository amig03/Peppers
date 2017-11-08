function onKeyDown(e) {
	
	var k = tetris.pressed_keys;

	switch (e.keyCode) {
		case 37:
			k.left = true;
			break;
		case 38:
			k.up = true;
			break;
		case 39:
			k.right = true;
			break;
		case 40:
			k.down = true;
			break;
		case 32:
			k.space = true;
			break;
	}
}

function onKeyUp(e) {

	var k = tetris.pressed_keys;

	switch (e.keyCode) {
			case 37:
				k.left = false;
				break;
			case 38:
				k.up = false;
				break;
			case 39:
				k.right = false;
				break;
			case 40:
				k.down = false;
				break;
			case 32:
			k.space = false;
			break;
		}
}