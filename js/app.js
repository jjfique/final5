

  // cambia el color del titulo y alterna 
function CambiaColor(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'blue');
			},
			
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			
		}, 600)
		.animate({
			opacity: '1'
		},{
			step: function () {
				CambiaColor('h1.main-titulo');
			},
			
		});
}

CambiaColor('h1.main-titulo');


//  genera números aleatorios
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// obtiene filas de dulces o columas de dulces
function DulcesArrays(arrayType, index) {

	var dulceCol1 = $('.col-1').children();
	var dulceCol2 = $('.col-2').children();
	var dulceCol3 = $('.col-3').children();
	var dulceCol4 = $('.col-4').children();
	var dulceCol5 = $('.col-5').children();
	var dulceCol6 = $('.col-6').children();
	var dulceCol7 = $('.col-7').children();

	var ColumnaDulce = $([dulceCol1, dulceCol2, dulceCol3, dulceCol4,
		dulceCol5, dulceCol6, dulceCol7
	]);

	if (typeof index === 'number') {
		var FilaDulce = $([dulceCol1.eq(index), dulceCol2.eq(index), dulceCol3.eq(index),
			dulceCol4.eq(index), dulceCol5.eq(index), dulceCol6.eq(index),
			dulceCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return ColumnaDulce;
	} else if (arrayType === 'rows' && index !== '') {
		return FilaDulce;
	}
}

// arreglos de filas
function FilaDulces(index) {
	var FilaDulce = DulcesArrays('rows', index);
	return FilaDulce;
}

// arreglos de colunmnas
function ColumnaDulce(index) {
	var candyColumn =DulcesArrays('columns');
	return candyColumn[index];
}

//alimina dulces en una columna
function validarColumna() {
	for (var j = 0; j < 7; j++) {
		var contador = 0;
		var PocicionDulce = [];
		var extraPocicionDulce = [];
		var candyColumn = ColumnaDulce(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (PocicionDulce.length >= 3) {
					gap = true;
				} else {
					PocicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						PocicionDulce.push(i - 1);
					} else {
						extraPocicionDulce.push(i - 1);
					}
				}
				if (!gap) {
					PocicionDulce.push(i);
				} else {
					extraPocicionDulce.push(i);
				}
				contador += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraPocicionDulce.length > 2) {
			PocicionDulce = $.merge(PocicionDulce, extraPocicionDulce);
		}
		if (PocicionDulce.length <= 2) {
			PocicionDulce = [];
		}
		contarDulces = PocicionDulce.length;
		if (contarDulces >= 3) {
			eliminaDulceColumna(PocicionDulce, candyColumn);
			Puntaje(contarDulces);
		}
	}
}
function eliminaDulceColumna(PocicionDulce, candyColumn) {
	for (var i = 0; i < PocicionDulce.length; i++) {
		candyColumn.eq(PocicionDulce[i]).addClass('delete');
	}
}

// Valida si hay dulces que deben eliminarse en una fila
function validarFila() {
	for (var j = 0; j < 6; j++) {
		var contador = 0;
		var PocicionDulce = [];
		var extraPocicionDulce = [];
		var FilaDulce = FilaDulces(j);
		var comparisonValue = FilaDulce[0];
		var gap = false;
		for (var i = 1; i < FilaDulce.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = FilaDulce[i].attr('src');

			if (srcComparison != srcCandy) {
				if (PocicionDulce.length >= 3) {
					gap = true;
				} else {
					PocicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						PocicionDulce.push(i - 1);
					} else {
						extraPocicionDulce.push(i - 1);
					}
				}
				if (!gap) {
					PocicionDulce.push(i);
				} else {
					extraPocicionDulce.push(i);
				}
				contador += 1;
			}
			comparisonValue = FilaDulce[i];
		}
		if (extraPocicionDulce.length > 2) {
			PocicionDulce = $.merge(PocicionDulce, extraPocicionDulce);
		}
		if (PocicionDulce.length <= 2) {
			PocicionDulce = [];
		}
		contarDulces = PocicionDulce.length;
		if (contarDulces >= 3) {
			eliminarFila(PocicionDulce, FilaDulce);
			Puntaje(contarDulces);
		}
	}
}
function eliminarFila(PocicionDulce, FilaDulce) {
	for (var i = 0; i < PocicionDulce.length; i++) {
		FilaDulce[PocicionDulce[i]].addClass('delete');
	}
}

//contador de puntuacion muestra la puntuacion
function Puntaje(contarDulces) {
	var puntos = Number($('#score-text').text());
	switch (contarDulces) {
		case 3:
			puntos += 10;
			break;
		case 4:
			puntos += 20;
			break;
		case 5:
			puntos += 30;
			break;
		case 6:
			puntos += 50;
			break;
		case 7:
			puntos += 100;
	}
	$('#score-text').text(puntos);
}

//pone los elemento caramelo en el tablero
function  PonerCaramelo() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulces = $(this).children().length;
		var agrega = top - dulces;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	moverDulce();
	validarBorrar();
}

// Si hay dulces que borrar
function validarBorrar() {
	validarColumna();
	validarFila();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		animacionBorrar();
	}
}



//efecto de mover dulces 
function moverDulce() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: seleccionDulce
	});
	$('img').droppable({
		drop: remplazarDulce
	});
	habilitarDulce();
}

function deshabilitarDulce() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function habilitarDulce() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//hace que el caramelo sea solido al moverse
function seleccionDulce(event, arrastraDulce) {
	arrastraDulce.position.top = Math.min(100, arrastraDulce.position.top);
	arrastraDulce.position.bottom = Math.min(100, arrastraDulce.position.bottom);
	arrastraDulce.position.left = Math.min(100, arrastraDulce.position.left);
	arrastraDulce.position.right = Math.min(100, arrastraDulce.position.right);
}

//reemplaza a los caramelos anteriores
function remplazarDulce(event, arrastraDulce) {
	var arrastraDulce = $(arrastraDulce.draggable);
	var dragSrc = arrastraDulce.attr('src');
	var soltarDulce = $(this);
	var dropSrc = soltarDulce.attr('src');
	arrastraDulce.attr('src', dropSrc);
	soltarDulce.attr('src', dragSrc);

	setTimeout(function () {
		PonerCaramelo();
		if ($('img.delete').length === 0) {
			arrastraDulce.attr('src', dragSrc);
			soltarDulce.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		PonerCaramelo();
	}
}

//valida la puntuacion por cantidad de elementos en linea
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

//eliminacion automatica de los elementos
function animacionBorrar() {
	deshabilitarDulce();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

//llenado automatico de los espacios con elementos 
function showPromiseError(error) {
	console.log(error);
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

//cronometro y boton reiniciar
//cambia el aspecto de la página
//final del juego
function finJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}

// inicia el juego
function initGame() {
    

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		PonerCaramelo();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finJuego
		})
	});
}

// Prepara el juego
$(function() {
	initGame();
});

