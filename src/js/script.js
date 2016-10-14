var $navBlock = $(".js-nav__block");
var $navWrapper = $(".js-nav__block-wrapper");
var navOffset = $navWrapper.offset().top;

var init = function() {
	$(window).on('scroll', _.throttle(stickyHeader, 50));
}

var stickyHeader = function() {
    positionWindow = $(window).scrollTop();

    if (positionWindow >= navOffset && !$navWrapper.hasClass('sticky')) {
    	$navWrapper.addClass('sticky');
    } else if (positionWindow < navOffset) {
    	$navWrapper.removeClass('sticky');
    }
}

init();