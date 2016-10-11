/**
 * created by fengjie in 2016-01-20
 */
;
! function($) {
    "use strict";
    $('<img/>').attr('src', 'img/about-bg.jpg').load(function() {
        $('#intro').addClass('active');
    });
}(jQuery);
