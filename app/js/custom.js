$(window).on("load", function() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$("body").addClass("ios");
	} else {
		$("body").addClass("web");
	}
	$("body").removeClass("loaded");
});

/* viewport width */
function viewport() {
	var e = window,
		a = "inner";
	if (!("innerWidth" in window)) {
		a = "client";
		e = document.documentElement || document.body;
	}
	return { width: e[a + "Width"], height: e[a + "Height"] };
}
/* viewport width */
$(function() {
	/* placeholder*/
	$("input, textarea").each(function() {
		var placeholder = $(this).attr("placeholder");
		$(this).focus(function() {
			$(this).attr("placeholder", "");
		});
		$(this).focusout(function() {
			$(this).attr("placeholder", placeholder);
		});
	});
	/* placeholder*/
	/*button open main nav begin*/
	$(".js-button-nav").click(function() {
		$(this).toggleClass("active");
		$(".main-nav-list").slideToggle();
		return false;
	});

	/*button open main nav end*/

	/* components begin*/
	/*	
	if ($('.js-img').length) {
		var jsImg = $(".js-img");
		new LazyLoad(jsImg, {
			root: null,
			rootMargin: "0px",
			threshold: 0
		});
	};
	if ($('.js-swiper').length) {
		var mySwiper = new Swiper('.js-swiper', {
				loop: true,
				slidesPerView: 1,
				noSwiping: true,
				autoplay: {
					delay: 1000,
					disableOnInteraction: false,
				},
				breakpoints: {
					1024: {
							slidesPerView: 2
					}
				}
		})
	}; 

	if($('.js-styled').length) {
		$('.js-styled').styler();
	};
	if($('.js-fancybox').length) {
		$('.js-fancybox').fancybox({
			margin  : 10,
			padding  : 10
		});
	};
	
	if($('.js-scroll').length) {
		$(".js-scroll").mCustomScrollbar({
			axis:"x",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	};	
	*/
	/* components end*/
});

var handler = function() {
	var height_footer = $("footer").height();
	var height_header = $("header").height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});

	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	if (viewport_wid <= 991) {
	}
};
$(window).bind("load", handler);
$(window).bind("resize", handler);
