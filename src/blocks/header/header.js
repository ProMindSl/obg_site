/* header */

/* global vars */
const PAGE_INDEX = 'http://localhost:3000/index.html';
const PAGE_ACTIVITY = 'http://localhost:3000/index.html';;
const PAGE_FOR_STUDENTS = 'http://localhost:3000/index.html';;
const PAGE_DOCUMENTS = 'http://localhost:3000/index.html';;
const PAGE_CONTACT = 'http://localhost:3000/index.html';;

var currPage = PAGE_INDEX;

setCurrPage(getNameByURL(window.location.href));

function setCurrPage(name)
{
	switch(name)
	{
		case 'main':
			currPage = PAGE_INDEX;
			break;

		case 'activity':
			currPage = PAGE_ACTIVITY;
			break;

		case 'for_students':
			currPage = PAGE_FOR_STUDENTS;
			break;
		
		case 'documents':
			currPage = PAGE_DOCUMENTS;
			break;

		case 'contact':
			currPage = PAGE_CONTACT;
			break;
	}
	/* Меняем цвет кнопки текущей страницы в хэдере*/
	$('.header__menu__btn[name='+name+']').css({'color':'#ffc600'});
}

function getNameByURL(url)
{
	switch (url)
	{
		case PAGE_INDEX:  
		case PAGE_INDEX+'#':
		case 'http://localhost:3000/':
			return 'main';
			break;

		case PAGE_ACTIVITY:
			return 'activity';
			break;

		case PAGE_FOR_STUDENTS:
			return 'for_students';
			break;

		case PAGE_DOCUMENTS:
			return 'documents';
			break;

		case PAGE_CONTACT:
			return 'contact';
			break;
	}

}

// обработчик клика на кнопку MAIN меню
$('#id_head-min-menu').on('click', function() {
	
	let _menu = $('.header__menu');
	
	if(_menu.css('display') == 'none')	
	{
		_menu.css({'display': 'block'});
		TweenMax.from( _menu, 0.8, {opacity:0, ease: Power4.easeOut});
		TweenMax.from( _menu, 0.7, {y:200, ease: Power4.easeOut});
	}
	else 
	{
		_menu.css({'display': 'none'});
	}
});

// обработчик клика на кнопку UP меню
$('#btn-show-up-menu').on('click', function() {
	
	let _menu = $('.header__up-bar__up-menu');
	
	if(_menu.css('display') == 'none')	
	{
		_menu.css({'display': 'inline-block'});
		
		// Анимация кнопок меню
		let _btn_qty = 3; // кол-во кнопок
		for(let btn_nums=0; btn_nums<_btn_qty; btn_nums++)
		{
			TweenMax.from( $('.header__up-bar__up-menu__btn[name="btn-'+String(btn_nums+1)+'"]'), 
						   0.8, 
						   {opacity:0, delay: Number((btn_nums+1)/10), ease: Power4.easeOut});
			TweenMax.from( $('.header__up-bar__up-menu__btn[name="btn-'+String(btn_nums+1)+'"]'), 
						   0.7, 
						   {y:200, delay: Number((btn_nums+1)/10), ease: Power4.easeOut});
		}
	}
	else 
	{
		_menu.css({'display': 'none'});
	}
});


/* Включаем display для меню при морфе в десктопное меню */
function windowResizeHandler_fromHeader()
{
	let _menu = $('.header__menu');
	let _up_menu = $('.header__up-bar__up-menu');

	// для main menu
	//if ($(window).width() > '600')
	if (matchMedia('only screen and (min-width: 600px)').matches)
	{
		if(_menu.css('display') == 'none')	_menu.css({'display': 'inline-block'});
		if(_menu.css('transform') != 'none')_menu.css({'transform':'none'});
	}
	//else if ($(window).width() <= '600')
	else if (matchMedia('only screen and (max-width: 599px)').matches)
	{
		_menu.css({'display': 'none'});
	} 

	// для up menu
	//if ($(window).width() > '1050')
	if (matchMedia('only screen and (min-width: 1050px)').matches)
	{
		if(_up_menu.css('display') == 'none')	_up_menu.css({'display': 'inline-block'});
	}
	//else if ($(window).width() <= '1050')
	else if (matchMedia('only screen and (max-width: 1049px)').matches)
	{
		_up_menu.css({'display': 'none'});
	} 
}

$(window).resize(windowResizeHandler_fromHeader); // при изменении размеров


// анимация лого (искажение перспективы)
var container = document.getElementById('container_logo');
var inner = document.getElementById('inner_logo');
        
var onMouseEnterHandler = function(event) {
  update(event);
};
var onMouseLeaveHandler = function() {
  inner.style = "";
};
var onMouseMoveHandler = function(event) {
  if (isTimeToUpdate()) {
    update(event);
  }
};

container.onmouseenter = onMouseEnterHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmousemove = onMouseMoveHandler;

var counter = 0;
var updateRate = 10;
var isTimeToUpdate = function() {
  return counter++ % updateRate === 0;
};

// Mouse 
var mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
  },
  show: function() { return '(' + this.x + ', ' + this.y + ')'; }
}
// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

var update = function(event) {
  mouse.updatePosition(event);
  updateTransformStyle(
    (mouse.y / inner.offsetHeight/2).toFixed(2),
    (mouse.x / inner.offsetWidth/2).toFixed(2)
  );
};

var updateTransformStyle = function(x, y) {
  var style = "rotateX(" + (x*2) + "deg) rotateY(" + (y*2) + "deg)";
  inner.style.transform = style;
  inner.style.webkitTransform = style;
  inner.style.mozTransform = style;
  inner.style.msTransform = style;
  inner.style.oTransform = style;
};

