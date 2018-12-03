// front 
// for Item Slider
const BIAS_STEP = 105;
var bias = false;


$(document).ready(function(){
    
    // устанавливаем обработчики кликов на боковые arrow-кнопки
    $('#slider-btn-left').click(move_right);
    $('#slider-btn-right').click(move_left);
    
    //  установка слушателей на айтемы
    setListenersForSliderItems();
});

function move_left()
{
    // ссылка на список айтемов
    var ulMask = $('ul.front__slider-switcher__mask__list');
    
    // убираем слушатели с соседних айтемов
    removeListenersForSliderItems();

    // если есть смещение списка влево, то переносим первый элемент списка    
    if (bias)
    {
        var first_li = $('li.front__slider-switcher__mask__list__item').first();
        var last_li = $('li.front__slider-switcher__mask__list__item').last();

        first_li.insertAfter(last_li);
    }
    
    // анимация  
    TweenMax.fromTo(ulMask, 
                      0.5, { x:0, ease: Power4.easeOut},
                           { x:-BIAS_STEP, ease: Power4.easeOut});

    // установка флага смещения ul 
    bias = true;
    // внесение атрибута смещения в html (для срабатывания подсветки в css необходимых элементов с учетом смещения списка)
    ulMask.attr('data-bias', 'true');
    
    // меняем bg
    changeBgSlide('DIR_RIGHT');

    // меняем caption
    changeCaptionSlide('DIR_RIGHT');

    // устанавливаем слушатели для соседних айтемов нового центрального
    setListenersForSliderItems();
}

function move_right()
{
    // ссылка на список айтемов
    var ulMask = $('ul.front__slider-switcher__mask__list');
    
    // убираем слушатели с соседних айтемов
    removeListenersForSliderItems();

    // если нет смещения списка влево, то переносим последний элемент списка    
    if (!bias)
    {
        var first_li = $('li.front__slider-switcher__mask__list__item').first();
        var last_li = $('li.front__slider-switcher__mask__list__item').last();

        last_li.insertBefore(first_li);
    }

    // анимация  
    TweenMax.fromTo(ulMask, 
                    0.5, { x:-BIAS_STEP, ease: Power4.easeOut},
                         { x:0, ease: Power4.easeOut});

    // установка флага смещения ul
    bias = false;
    // внесение атрибута смещения в html(для срабатывания подсветки в css необходимых элементов с учетом смещения списка)
    ulMask.attr('data-bias', 'false');
    
    // меняем bg
    changeBgSlide('DIR_LEFT');

    // меняем caption
    changeCaptionSlide('DIR_LEFT');

    // устанавливаем слушатели для соседних айтемов с центральным
    setListenersForSliderItems();
}

function get_curr_slider_items() // возвращаем текущий айтем слайдера и два его окружающих
{
    var ulMask = $('ul.front__slider-switcher__mask__list');
    var curr_item;
    var left_item;
    var right_item;

    // выбираем обекты в зависимости от наличия смещения
    if (bias)
    { 
        curr_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(3)');
        left_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(2)');
        right_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(4)');
    }
    if (!bias)
    {
        curr_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(2)');
        left_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(1)');
        right_item = ulMask.find('li.front__slider-switcher__mask__list__item:nth-child(3)');
    }

    //console.log(curr_item.attr('data-index'));
    return { currentItem: curr_item,
             leftItem: left_item, 
             rightItem: right_item };

}

function setListenersForSliderItems()
{
    //get_curr_slider_items().leftItem.bind('click', move_right);
    //get_curr_slider_items().rightItem.bind('click', move_left);
    get_curr_slider_items().leftItem.on('click', move_right);
    get_curr_slider_items().rightItem.on('click', move_left);   
}

function removeListenersForSliderItems()
{

    //get_curr_slider_items().leftItem.unbind('click');
    //get_curr_slider_items().rightItem.unbind('click');
    get_curr_slider_items().leftItem.off('click');
    get_curr_slider_items().rightItem.off('click');
}

// for caption 
const CAP_SL_QTY = 5;
var currCaptionSlide = 2;

function changeCaptionSlide(direction)
{    
    // убираем предыдущий слайд
    $('.front__caption-container[name="caption-'+String(currCaptionSlide)+'"]').css({'display': 'none'});
        
    if (direction === 'DIR_RIGHT') currCaptionSlide++;
    if (direction === 'DIR_LEFT') currCaptionSlide--;
    
    // контроль выхода за предел кол-ва слайдеров
    if (currCaptionSlide > CAP_SL_QTY) currCaptionSlide = 1;
    if (currCaptionSlide <= 0) currCaptionSlide = CAP_SL_QTY;

    // показываем новый слайд
    $('.front__caption-container[name="caption-'+String(currCaptionSlide)+'"]').css({'display': 'block'});

}
