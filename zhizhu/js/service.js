/**
 * created by fengjie in 2016-01-20
 */
;
! function($) {
    "use strict";
    var Pj = (function() {
        var target = ['web', 'app', 'weixin', 'admin'];
        return {
            testTarget: function() {
                // 检测时候有target
                var t = location.href.slice(location.href.lastIndexOf('@') + 1);
                target.indexOf(t) != -1 && (
                    $('body').animate({
                        scrollTop: ($('#' + t).offset().top - 100)
                    }, 400)
                );
            }
        };
    })();

    // 封面图动效
    $('<img/>').attr('src', 'img/service-bg.jpg').load(function() {
        $('#intro').addClass('active');
    });

    // 检测target
    Pj.t = setInterval(function() {
        clearInterval(Pj.t);
        Pj.testTarget();
    }, 400);
}(jQuery);
