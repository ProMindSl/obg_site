// BG slider part
const BG_SL_QTY = 6;
var currBgSlide = 1;


// CURRENT CODE
document.addEventListener('keydown', (event) => {
  const keyNum = event.keyCode;
  if (keyNum === 32)
  {
	changeBgSlide();
  }
  
}, false);
// END CURRENT CODE


function changeBgSlide()
{
	// убираем предыдущий слайд
	TweenMax.to($('#bg_id_'+String(currBgSlide)), 1, {opacity:0});

	// контроль выхода за предел кол-ва слайдеров
	currBgSlide++;
	if (currBgSlide > BG_SL_QTY) currBgSlide = 1;

	// показываем новый слайд
	TweenMax.to($('#bg_id_'+String(currBgSlide)), 1, {opacity:1});
}