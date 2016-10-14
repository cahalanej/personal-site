var $downloadsBlock = $(".js-resume__downloads");
var $downloadsWrapper = $(".js-resume__downloads-wrapper");
var downloadsOffset = $downloadsWrapper.offset().top - 20;

var init = function() {

	if ($(window).width() > 575) {
		$(window).on('scroll', _.throttle(stickyDownload, 50));
	}
}

var stickyDownload = function() {
    positionWindow = $(window).scrollTop();

    if (positionWindow >= downloadsOffset && !$downloadsBlock.hasClass('sticky')) {
    	$downloadsBlock.addClass('sticky');
    } else if (positionWindow < downloadsOffset) {
    	$downloadsBlock.removeClass('sticky');
    }
}

init();