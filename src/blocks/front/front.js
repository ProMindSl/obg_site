// front 
$(document).ready(function(){
    $('#slider-btn-left').click(move_right);
    $('#slider-btn-right').click(move_left);
    
    function move_left(eventObject)
    {
        
        var first_li = $('li.front__slider-switcher__mask__list__item').first();
        var last_li = $('li.front__slider-switcher__mask__list__item').last();

        first_li.insertAfter(last_li);

        TweenMax.fromTo($('ul.front__slider-switcher__mask__list'), 
                      0.5, { x:0, ease: Power4.easeOut},
                           { x:-90, ease: Power4.easeOut});
        
    }

    function move_right(eventObject)
    {
        

        var first_li = $('li.front__slider-switcher__mask__list__item').first();
        var last_li = $('li.front__slider-switcher__mask__list__item').last();

        last_li.insertBefore(first_li);

        TweenMax.fromTo($('ul.front__slider-switcher__mask__list'), 
                      0.5, { x:-90, ease: Power4.easeOut},
                           { x:0, ease: Power4.easeOut});
    }
});

