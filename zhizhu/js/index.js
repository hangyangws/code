var Pj = (function($) {
    "use strict";
    return new(function() {
        var _roll = $('#hyRoll'),
            _roll_li = _roll.find('.hy-roll-wrap').find('li'),
            _roll_item = _roll.find('.hy-roll-nav').find('a'),
            _roll_len = _roll_item.length,
            _roll_now = 0,
            _roll_time,
            _roll_only = (function() { // 检测滚动条数目
                _roll_len < 2 && (
                    _roll.addClass('hy-roll-one')
                );
            })();
        this.get_roll = function() {
            return _roll;
        };
        this.goRoll = function($this) {
            _roll_now = $this.data('i');
            _roll_li.eq(_roll_now)
                .siblings()
                .add($this.siblings())
                .removeClass('active')
                .end().end()
                .add($this)
                .addClass('active');
        };
        this.autoRoll = function() {
            _roll_time = setInterval(function() {
                Pj.newtRoll();
            }, 8000);
        };
        this.stopRoll = function() {
            clearInterval(_roll_time);
        };
        this.prevRoll = function() {
            _roll_now = --_roll_now < 0 ? _roll_len - 1 : _roll_now;
            Pj.goRoll(_roll_item.eq(_roll_now));
        };
        this.newtRoll = function() {
            _roll_now = ++_roll_now >= _roll_len ? 0 : _roll_now;
            Pj.goRoll(_roll_item.eq(_roll_now));
        };
        this.tab = function($this) {
            $this.siblings().removeClass('active').end().addClass('active');
        };
    });
})(jQuery);

// 开始滚动
Pj.autoRoll();

Pj.get_roll().on({
    mouseenter: function() {
        Pj.stopRoll();
    },
    mouseleave: function() {
        Pj.autoRoll();
    }
});

// 鼠标交互轮播图
Pj.get_roll().on('mouseenter', '.hy-roll-nav a', function() {
    Pj.goRoll($(this));
});

Pj.get_roll().on('click', '.roll-nav-prev', function() {
    Pj.prevRoll();
});

Pj.get_roll().on('click', '.roll-nav-next', function() {
    Pj.newtRoll();
});

// 鼠标交互 tab 标签
$('#advantage').on('mouseenter', 'li', function() {
    Pj.tab($(this));
});
