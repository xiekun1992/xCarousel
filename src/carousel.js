(function(xCarousel){
	if(typeof module === 'object' && typeof exports === 'object'){
		module.exports = xCarousel;
	}else if(typeof define === 'function' && define.amd){
		define('xCarousel', xCarousel);
	}else if(typeof exports === 'object'){
		exports.xCarousel = xCarousel;
	}else{
		this.xCarousel = xCarousel;
	}
})(function(options){
	var container = options.container;
	var height = options.height;
	return {
		itemActive: 0,
		timer: null,
		itemLength: 0,
		indicators: null, 
		indicatorsArr: null,
		items: null,
		init: function(){
			var imgs = $(container + ">img");
			var carouselImgHtml = '', carouselIndicatorHtml = '';
			$.each(imgs, function(i, o){
				carouselImgHtml += '<div class="item ' + (!i && 'active' || '') + '">' +
									'<div class="img" style="background-image: url(' + $(o).attr('src') + ');"></div>' +
								'</div>';
				carouselIndicatorHtml += '<li class="' + (!i && 'active' || '') + '"></li>';
			});

			var carouselHtml = '<div class="x-carousel slide">' +
				'<div class="x-carousel-inner">' +
					carouselImgHtml + 
				'</div>' +
				'<ol class="x-carousel-indicators">' +
					carouselIndicatorHtml + 
				'</ol>' +
			'</div>';
			$(container).html(carouselHtml);
			$(container + ">.x-carousel, " + container + " .x-carousel-inner, " + container + " .x-carousel-inner .item>.img").css('height', height + 'px');

			this.itemLength = imgs.length;
			this.indicators = $(container + ">.x-carousel>.x-carousel-indicators>li");
			this.items = $(container + ">.x-carousel>.x-carousel-inner>.item");
			this.indicatorsArr = Array.prototype.slice.call(this.indicators);
			var self = this;
			this.indicators.click(function(){
				self.itemActive = self.indicatorsArr.indexOf($(this)[0]);
				clearInterval(self.timer);
				self.changeItem();
				self.carouselResizeFn();
			});
			this.carouselResizeFn();
		},
	    changeItem: function(){
			$.each(this.items, function(i, o){
				if(i == this.itemActive){
					$(this.indicators[i]).addClass('active');
					$(o).fadeIn();
				}else{
					$(this.indicators[i]).removeClass('active');
					$(o).fadeOut();
				}
			}.bind(this));
		},
	    carouselResizeFn: function(){
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				this.changeItem();
				this.itemActive = (this.itemActive + 1) % this.itemLength;
			}.bind(this), 2000);
		}
	};
});