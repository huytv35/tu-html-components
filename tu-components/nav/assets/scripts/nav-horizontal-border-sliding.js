"use strict";

(function($){
    $.fn.nav_hor_border_sliding = function() {
        // Init variabels, functions useful
        var lineStyle = {
            "display": "block",
            "position": "absolute",
            "bottom": 0,
            "z-index": 10,
            "border-bottom": "3px solid #fff",
            "-webkit-transition": "all .3s ease",
            "-moz-transition": "all .3s ease",
            "transition": "all .3s ease",
        },
        selector = $(this), 
        item = selector.find('.item'),
        itemActive = selector.find('.item.is-active'),
        itemNotActive = item.not('.is-active');
        
        var lineAcitve = '<span class="js-line-active"></span>';
        selector.prepend(lineAcitve);
        
        var line = selector.find('.js-line-active');
        line.css(lineStyle);
    
        /*
            @Function: get_width_items
            @Parameter 1: elements > Element to find 
            @Return: array[width1, width2, ..]
        */
        function get_width_items(elements) 
        {
            let array = [];
    
            elements.each(function() {
                array.push($(this).outerWidth());
            });
    
            return array;
        }
    
        /*
            @Function: get_position_left
            @Parameter 1: itemsWidth > The itemWidth is array, that it is include width of each element.
            @Parameter 2: current > element current
            @Return: Position Left
        */
        function get_position_left(itemsWidth, current) 
        {
            let left = 0;
            let currentIndex = current.index() - 1;
    
            for (var i = 0; i < currentIndex; i++) {
                left += itemsWidth[i];
            }
            
            return left;
        }
    
        var elementsWidth = get_width_items(item); // Get width
    
        var itemActiveWidth = itemActive.outerWidth();
        var itemActiveChildWidth = itemActive.find('a').outerWidth();
        var itemActiveChildLeft = get_position_left(elementsWidth, itemActive) + (itemActiveWidth - itemActiveChildWidth)/2;
    
        line.css(
            {
                "left" : itemActiveChildLeft,
                "width" : itemActiveChildWidth,
            }
        );
    
        itemNotActive.hover(function(){
            let _this = $(this);
            
            let _thisWidth = $(this).outerWidth();
            let childWidth = $(this).find('a').outerWidth();
            let childLeft = get_position_left(elementsWidth, _this) + (_thisWidth - childWidth)/2;
    
            line.css(
                {
                    "left": childLeft,
                    "width": childWidth
                }
            );
        }, function(){
            line.css(
                {
                    "left" : itemActiveChildLeft,
                    "width" : itemActiveChildWidth,
                }
            );
        });
    
        setTimeout(function(){
            selector.addClass('is--visible');
        }, 800);

        return this;
    };
})(jQuery)

jQuery(document).ready(function(){
    $('#nav_hor_sliding').nav_hor_border_sliding();
});