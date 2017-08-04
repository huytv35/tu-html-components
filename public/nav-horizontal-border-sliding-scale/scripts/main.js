jQuery(document).ready(function($){
    function nav_horizontal_border_sliding_scale(){
        var item = $('.nav-hor__item');

        function get_left(items, current) {
            var width = 0;
            for (var i = 0; i < (current.index() - 1); i++) {
                width += items[i] + 44;
            }
            return width;
        }

        function get_items_width(el){
            var array = [];
            el.each(function(){
                array.push($(this).width());
            });

            return array;
        }

        var items_width = get_items_width(item);
        item.removeClass('is--active2');

        setTimeout(function(){
            var border = $('.nav-hor__border'), 
                item_active = $('.nav-hor__item.is--active'), 
                item_not_active = item.not('.is--active'), 
                item_active_left = 0;

            var items_new_width = get_items_width(item);

            if (item_active.index() !== 1) {
                item_active_left = get_left(items_new_width, item_active);
            }

            border.css({
                'left' : item_active_left,
                'width': items_width[item_active.index() - 1]
            });

            item_not_active.hover(function(event){
                var _this = $(this);
                var _this_index = $(this).index();
                var current_left = 0;

                item_not_active.removeClass('is--active2');
                $(this).addClass('is--active2');

                current_left = get_left(items_new_width, _this);

                border.css({
                    'left' : current_left,
                    'width': items_width[_this_index - 1]
                });
            }, function(){
                item_not_active.removeClass('is--active2');

                border.css({
                    'left' : item_active_left,
                    'width': item_active.width()
                });
            });

            $('.nav-hor--borders-sliding').addClass('is--visible');
        }, 800);
    }
    nav_horizontal_border_sliding_scale();
});