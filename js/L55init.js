$(document).ready(function() {
	$('nav').on('click touchstart', function(e) {
		e.stopPropagation();
		if(e.type == 'touchstart') {
			if ($('.menu').hasClass('menu-active')) {
				$('.menu').removeClass('menu-active');
			} else {
				$('.menu').addClass('menu-active');
			}
		}
	});
	$(function() {
		FastClick.attach(document.body);
	});

});