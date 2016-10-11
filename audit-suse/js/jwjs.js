;(function($){

  var jwjs = (function () {

    var fir = $('.m-img-btn li:first')[0],
        now = fir,
        next;

    return {

      gotoFixed : function (this$) {
        var index = this$.siblings().removeClass('active').end().addClass('active').attr('data-index'),
            dom = $('.m-img').find("li[data-index=" + index + "]");
        dom.siblings().removeClass('active').end().addClass('active');
      },

      start : function () {
        next = $(now).next()[0];
        now = next ? next : fir;
        jwjs.gotoFixed($(now));
      }
    };
  }());

  // gotoFixed
  $('.m-img-btn li').bind('hover', function () {
    jwjs.gotoFixed($(this));
  });

  // info hovr change
  // hy change
  $('.info-each>div>ul>li').bind('click', function () {
    $(this).parents('.info-each').find('h3 a')
           .attr('href', 'list-' + $(this).find('span[data-i]').attr('data-i') + '.aspx')
           .end().end()
           .siblings().removeClass('live').end().addClass('live');
  });

  // cricle timeID
  var time = setInterval(jwjs.start, 4000);

  // carousel stop
  $('.m-carousel').hover(function () {
    clearInterval(time);
  }, function () {
    time = setInterval(jwjs.start, 4000);
  });
})(jQuery);