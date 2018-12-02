// BG slider part
const BG_SL_QTY = 5;
var currBgSlide = 2;


function changeBgSlide(direction)
{
	// убираем предыдущий слайд
	TweenMax.to($('#bg_id_'+String(currBgSlide)), 0.5, {opacity:0});

	
	if (direction === 'DIR_RIGHT') currBgSlide++;
	if (direction === 'DIR_LEFT') currBgSlide--;
    
    // контроль выхода за предел кол-ва слайдеров
	if (currBgSlide > BG_SL_QTY) currBgSlide = 1;
	if (currBgSlide <= 0) currBgSlide = BG_SL_QTY;

	// показываем новый слайд
	TweenMax.to($('#bg_id_'+String(currBgSlide)), 0.5, {opacity:1});
}