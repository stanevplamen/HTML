$(window).load(function()
{	

	$(window).trigger('resize');
	//setTimeout(function(){slideIn(1)}, 300);
	$('#text1').css({left:0});
	$('#image1').css({left:0});

	TweenLite.to($('.carouselHome'), .5, {css:{autoAlpha:1}} )

	var autoSlide = 1;
	var c = 1;
	var nav = $('.control-nav li a');
	var ease = "easeInOutExpo";
	var animTime = 2000;
	var animTimeout = 300;
	var animTimeoutIn = 100;
	var sliding = false;
	var slides_count = $('#slide1').children().length
	var run_timeout = 	setTimeout(function(){run(2)}, 3000);
	
	function run(sld)	{
		if(autoSlide)
		{
			slideOut(sld);
			var sld2 = sld+1;
			if(sld2 == slides_count + 1) sld2 = 1;
			clearTimeout(run_timeout);
			run_timeout = setTimeout(function(){run(sld2)}, 7000);
		}
	}
	
	function gup(param){
		if(typeof param == "undefined") return;
		param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+param+"=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec( window.location.href);
		if(results == null)	{
			return false;
		} else	{
			return results[1];
		}
	}
	
	var sl = gup('sl');
	if(sl) setTimeout(function(){slideOut(sl)}, 100);
	var stop_auto_slide = -1;


	nav.bind('click', function(e){

		if(e && typeof e.preventDefault == 'function') e.preventDefault()

		if (!$(this).hasClass('active'))
		{
			var n = $(this).attr('id');
			n = n.substring(3);
			slideOut(n);
			autoSlide = 0;
			var sld3 = parseInt(n)+1;
			if(sld3 >= slides_count) sld3 = 1;
			clearTimeout(stop_auto_slide);
			stop_auto_slide = setTimeout(function(){clearTimeout(); autoSlide = 1; run(sld3)}, 15000);
		}
	});
	
	function getDistance() { return Math.max(982, $(window).width()*.5+496+50); }
	
	slideOut = function(n) {
		if(sliding) {
			return;
		}
		sliding = true;
		nav.removeClass('active'); 

		$('#sl_'+n).addClass('active');
		
		var slideDistance = getDistance();
		var $text = $('#text'+c).css({zIndex:20});
		var $img = $('#image'+c).css({zIndex:19});

		// current slide
		TweenMax.staggerFromTo([$text, $img], 2, {css:{left:0}}, {css:{left:-slideDistance},ease : Expo.easeInOut}, .2)
		TweenLite.fromTo([$text, $img], 2, {css:{autoAlpha:0}}, {css:{autoAlpha:0},ease : Expo.easeInOut, delay: 1.5})

		// new slide
		var $ntext = $('#text'+n).css({zIndex:30});
		var $nimg = $('#image'+n).css({zIndex:29});

		TweenMax.staggerFromTo([$ntext, $nimg], 2, {css:{left:slideDistance,autoAlpha:0}}, {css:{left:0,autoAlpha:1},ease : Expo.easeInOut, delay:.3, onComplete : function() {
			sliding = false;
		}}, .2)
		c = n;
	}
});
