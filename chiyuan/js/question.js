;
/**
 * created by hangyangws in 2016-05-20
 * 常见问题页面
 */

! function(win, $) {
    var $cqTree = $('#cqTree'),
        $win = $(win),
        $banner = $('#banner'),
        $aside = $('#aside'),
        _top_height = $banner.height() + 75,
        Question = {
            scroll: function() {
                if ($win.scrollTop() > _top_height) {
                    $aside.addClass('fixed');
                } else {
                    $aside.removeClass('fixed');
                }
            },
            resize: function() {
                _top_height = $banner.height() + 75;
            }
        };
    // 一级导航点击
    $cqTree.on('click', '.arrow-trigger', function() {
        $(this).closest('.cq-list').toggleClass('active');
    });
    // 检测滚动
    $win.on('scroll', function() {
        Question.scroll();
    });
    // 窗口大小改变事件
    $win.on('resize', function() {
        Question.resize();
    });
}(window || this, jQuery);
