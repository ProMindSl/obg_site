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

// обработчик клика на кнопку меню
$('#id_head-min-menu').on('click', function() {
	
	let _menu = $('.header__menu');
	
	if(_menu.css('display') == 'none')	
	{
		_menu.css({'display': 'block'});
		TweenMax.from( _menu, 3, {opacity:0, ease: Power4.easeOut});
		TweenMax.from( _menu, 0.7, {y:200, ease: Power4.easeOut});
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


	if ($(window).width() > '600')
	{
		if(_menu.css('display') == 'none')	_menu.css({'display': 'inline-block'});
	}
	else if ($(window).width() <= '600')
	{
		_menu.css({'display': 'none'});
	} 
}
$(window).resize(windowResizeHandler_fromHeader); // при изменении размеров