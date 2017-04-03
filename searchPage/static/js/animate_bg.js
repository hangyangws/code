// 粒子动画相应参数与方法

var $canvas = doc.querySelector('#bgAnimate'), // canvas Dom节点
    ctx = $canvas.getContext('2d'), // canvas 2d 上下文
    _dot_number = 100, // 离子数量
    _dot_acceleration = 1, // 离子加速度
    _dot_radius = 1, // 粒子半径
    _line_width = 1, // 粒子连线最大宽度
    _mouse_dis = 8000, // 鼠标和粒子之间最小间距

    ANIMATE = {
        init: function() {
            ANIMATE.resize(); // 窗口初始化
            ANIMATE.animateDraw(); // 开始动画
            // 检测是否要背景动画
            _user_obj.animate && ($main.className = $main.className + ' bg-animate');
        },
        resize: function() {
            $canvas.width = getWinWidth();
            $canvas.height = getWinHeight();
        },
        animateDraw: function() {
            // 清空画布
            ctx.clearRect(0, 0, $canvas.width, $canvas.height);
            // 添加鼠标坐标进入_dots
            var _all_dots = [_mouse_dot].concat(_dots),
                _all_len,
                _dot_len = _dot_number,
                dot1,
                dot2;
            while (_dot_len--) { // 操作每一个离子(不包括鼠标粒子)
                dot1 = _dots[_dot_len];
                // 离子位移
                dot1.x += dot1.xa;
                dot1.y += dot1.ya;
                // 遇到边界反向
                (dot1.x > $canvas.width - _dot_radius || dot1.x < _dot_radius) && (dot1.xa *= -1);
                (dot1.y > $canvas.height - _dot_radius || dot1.y < _dot_radius) && (dot1.ya *= -1);
                // 绘制粒子
                ctx.beginPath();
                ctx.fillStyle = dot1.color;
                ctx.arc(dot1.x, dot1.y, _dot_radius, 0, Math.PI * 2, true);
                ctx.fill();
                // 对比当前粒子与其他粒子距离
                _all_len = _all_dots.length;
                while (_all_len--) {
                    dot2 = _all_dots[_all_len];
                    // 遇到当前粒子 或者 鼠标粒子为空跳过
                    if (dot2 === dot1 || !dot2.x) continue;
                    // 2个粒子之间的距离
                    var _dis_x = dot2.x - dot1.x,
                        _dis_y = dot2.y - dot1.y,
                        distans = _dis_x * _dis_x + _dis_y * _dis_y,
                        ratio = (dot2.power - distans) / dot2.power;
                    if (distans < dot2.power) {
                        // 如果是鼠标粒子，则移向鼠标粒子
                        if (dot2 === _mouse_dot && distans > _mouse_dis) {
                            dot1.x += _dis_x * ratio / 60;
                            dot1.y += _dis_y * ratio / 60;
                        }
                        // 画线
                        ctx.beginPath();
                        ctx.lineWidth = _line_width * ratio;
                        ctx.strokeStyle = dot2.color;
                        ctx.moveTo(dot2.x, dot2.y);
                        ctx.lineTo(dot1.x, dot1.y);
                        ctx.stroke();
                    }
                }
            }
            RAF(ANIMATE.animateDraw);
        }
    };
/**
 * 动画
 */
ANIMATE.init(); // 动画初始化
addEvent(win, 'resize', ANIMATE.resize); // 窗口改变大小
addEvent(win, 'mousemove', function(e) { // 鼠标移动
    e = e || win.event;
    _mouse_dot.x = e.clientX;
    _mouse_dot.y = e.clientY;
});
addEvent(win, 'mouseout', function() { // 鼠标移出
    _mouse_dot.x = null;
    _mouse_dot.y = null;
});
