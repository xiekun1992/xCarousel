	var itemActive = 0;
	var timer;  
	var itemLength = $(".x-carousel>.x-carousel-inner>.item").length;
	var indicators = $(".x-carousel>.x-carousel-indicators>li"), indicatorsArr = Array.prototype.slice.call(indicators);
	var items = $(".x-carousel>.x-carousel-inner>.item");

	indicators.click(function(){
		itemActive = indicatorsArr.indexOf($(this)[0]);
		clearInterval(timer);
		changeItem();
		carouselResizeFn();
	})

	var changeItem = function(){
		$.each(items, function(i, o){
			if(i == itemActive){
				$(indicators[i]).addClass('active');
				$(o).fadeIn();
			}else{
				$(indicators[i]).removeClass('active');
				$(o).fadeOut();
			}
		});
	}
	var carouselResizeFn = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			changeItem();
			itemActive = (itemActive + 1) % itemLength;
		}, 2000);
	}
	carouselResizeFn();