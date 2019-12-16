

  //punto 1. cambia el color del titulo y alterna 
function CambiaColor(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'blue');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		}, 600)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				CambiaColor('h1.main-titulo');
			},
			queue: true
		});
}

CambiaColor('h1.main-titulo');