
var sliderAuto = true; // Slider auto-change
var sliderTimeout = 4000; // Slider auto-change interval

(function(){

  $('.colorselect__color').on('click', function(e) {
    e.preventDefault();
    $('.colorselect__color.active').removeClass('active');
    $(this).addClass('active');
  });

  // Magnific Popup (Lightbox)
  // Docs: https://github.com/dimsemenov/Magnific-Popup
  $('.item-full__images').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery:{
      enabled:true
    }
  });

  // Skrollr
  // Docs: https://github.com/Prinzhorn/skrollr
  var s = skrollr.init({});

  // Smooth Scroll
  // Docs: https://github.com/cferdinandi/smooth-scroll
  smoothScroll.init();

  // Infinite Ajax Scroll
  // Docs: https://github.com/webcreate/infinite-ajax-scroll
  var ias = $.ias({
    container: "#items",
    item: ".item-full",
    pagination: "#pagination",
    next: ".next"
  });

  ias.extension(new IASTriggerExtension({offset: 100}));
  ias.extension(new IASSpinnerExtension({
    html: '<div class="spinner"><i class="fa fa-circle-o-notch fa-spin"></i></div>'
  }));

})();

/////////////////
// IMAGES @2X  //
/////////////////
(function(){

  if(window.devicePixelRatio >= 1.2){
      var images = document.getElementsByTagName('img');
      for(var i=0;i < images.length;i++){
          var attr = images[i].getAttribute('data-2x');
          if(attr){
              images[i].src = attr;
          }
      }
  }

})();

/////////////////
//   SLIDER    //
/////////////////

(function(){
	if ($('.slider__item').length > 0) {

		if ($('.header__slider').attr('data-count') == undefined)
			$('.header__slider').attr('data-count', 0);

		var count = parseInt($('.header__slider').attr('data-count'));

		var slidesCount = $('.header__slider .slider__item').size()-1;
	}

	$('.header__slider .slider__nav').on('click', function(e) {
		e.preventDefault();
		if ($('.header__slider .slider__item:animated').size()>0) return;
		var direction;
		$(this).hasClass('slider__nav--next') ? direction = 1 : direction = 0;

		if (direction == 0)
			(count == 0) ? count = slidesCount + 1 : count = count;
		else
			(count == slidesCount) ? count = - 1 : count = count;

		$('.header__slider .slider__item.active').fadeOut(300, function() {
			$(this).removeClass('active');
			(direction == 1) ? count++ : count--;
			$('.header__slider .slider__item').eq(count).fadeIn(300);
            $('.header__slider .slider__item').eq(count).addClass('active');
			$('.header__slider').attr('data-count', count);
		});
	});

    if (sliderAuto) {
        setInterval(function(){
            $('.header__slider .slider__nav--next').click();
        }, sliderTimeout);
    }

})();


////////////////////////
//     ACCORDION      //
////////////////////////

(function(){

    $('.accordion a.accordion__parent').on('click', function(e) {
        e.preventDefault();
        $('.accordion .active').removeClass('active');
        $(this).parent().addClass('active');
    });

})();

////////////////////////
//  PLACEHOLDERS FIX  //
////////////////////////

(function(){

  if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
  } else if ($.fn.placeholder.input) {
  	$('textarea').placeholder();
  } else {
  	$('input, textarea').placeholder();
  }

})();

// 	/////////////
// 	//   MAP   //
// 	/////////////

// 	ymaps.ready(function () {
// 	    var myMap = new ymaps.Map('map', {
// 	        center: [43.166807, 131.908544],
// 	        zoom: 17,
// 	        offset: [100, 100],
// 	        controls: []
// 	    });

// 	    var myPlacemark = new ymaps.Placemark([43.166807, 131.908544], {
// 	        balloonContentBody: [
// 	            '<address>',
// 	            '<strong>Автомобили с аукционов Японии, Кореи и США</strong>',
// 	            '<br/>',
// 	            'Адрес: г. Владивосток, ул.Русская 9Б, офис 608',
// 	            '<br/>',
// 	            'Тел.: 8(423)200-48-47',
// 	            '</address>'
// 	        ].join('')
// 	    }, {
// 	        preset: 'islands#dotIcon',
// 	        iconColor: '#126FA6'

// 	    });

// 	    myMap.geoObjects.add(myPlacemark);
// 	    myMap.behaviors.disable('scrollZoom');
// 	});

/////////////////////////
//  BROWSER DETECTION  //
/////////////////////////

var BrowserDetect =
{
    init: function ()
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data)
    {
        for (var i=0 ; i < data.length ; i++)
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString)
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser:
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

BrowserDetect.init();
