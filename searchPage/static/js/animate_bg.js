;
! function(g, doc, undefined) {
  // 简单的对象融合
  function extendsObj(to, from) {
    to = g.cloneObj(to);
    for (var i in to) {
      from[i] && (to[i] = from[i]);
    }
    return to;
  };

  // 获取随机颜色
  function getColor() {
    return 'rgba(R, G, B, A)'
      .replace('R', getRandom(0, 200))
      .replace('G', getRandom(0, 200))
      .replace('B', getRandom(0, 200))
      .replace('A', .15);
  }

  // 获取2个数之间的随机整数
  function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0) - 0;
  }

  // 获取窗口宽度
  function getWinWidth() {
    return g.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  // 获取窗口高度
  function getWinHeight() {
    return g.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
  }

  // 粒子对象构造函数
  function ParticleBg(_opt) {
    // 判断的参数合法性
    if (!_opt || !_opt.el) {
      throw '请传入合法的配置项目';
    }

    // 缓存this，压缩代码时候可以节约字节，防止this重定向
    var _this = this;

    _this.canvasRect = { // 当前画布宽高，在窗口改变大小的时候会改变
      w: getWinWidth(),
      h: getWinHeight()
    };

    // 融合用户传入参数，除了el参数是必须，其他非必须都有默认值
    _this.opt = extendsObj({
      el: null, // canvas DOM节点（必须）
      num: 100, // 粒子数量
      mouseDistance: 60, // 鼠标和粒子之间最小
      dotPower: 100, // 粒子之间什么距离会有吸引
      dotAcceleration: 1.2, // 离子加速度
      dotRadius: 0, // 粒子半径
      lineWidth: 1 // 粒子连线最大宽度
    }, _opt);

    // 鼠标坐标（相对于canvas背景左上角）
    _this.mousePoint = {
      x: null,
      y: null,
      dotPower: _this.opt.dotPower + 40
    };

    // canvas 2d 上下文
    _this.ctx = _this.opt.el.getContext('2d');

    // 初始化离子
    _this.dots = (function() {
      var _l = _this.opt.num,
        dots = [];
      while (_l--) {
        dots.push({
          x: getRandom(_this.opt.dotRadius, _this.canvasRect.w - _this.opt.dotRadius),
          y: getRandom(_this.opt.dotRadius, _this.canvasRect.h - _this.opt.dotRadius),
          xa: Math.random() * _this.opt.dotAcceleration - _this.opt.dotAcceleration / 2,
          ya: Math.random() * _this.opt.dotAcceleration - _this.opt.dotAcceleration / 2,
          color: getColor(),
          dotPower: _this.opt.dotPower
        });
      }
      return dots;
    })();

    _this.init();
  }

  // 粒子对象原型链
  var proto = ParticleBg.prototype;
  proto.init = function() {
    var _this = this;
    _this.resize(); // 窗口初始化
    _this.animate(); // 开始动画

    g.addEvent(g, 'resize', _this.resize.bind(_this));
    g.addEvent(g, 'mousemove', _this.mouseMove.bind(_this));
    g.addEvent(g, 'mouseout', _this.mouseOut.bind(_this));
  };
  proto.resize = function() {
    var _this = this;
    // 当前画布宽高
    _this.canvasRect = {
      w: getWinWidth(),
      h: getWinHeight()
    };
    _this.opt.el.width = _this.canvasRect.w;
    _this.opt.el.height = _this.canvasRect.h;
  };
  proto.mouseMove = function(e) {
    e = e || g.event;
    this.mousePoint.x = e.clientX;
    this.mousePoint.y = e.clientY;
  };
  proto.mouseOut = function() {
    this.mousePoint.x = null;
    this.mousePoint.y = null;
  };
  proto.animate = function() {
    var _this = this;
    // 清空画布
    _this.ctx.clearRect(0, 0, _this.canvasRect.w, _this.canvasRect.h);
    // 添加鼠标坐标进入_dots
    var _all_dots = [_this.mousePoint].concat(_this.dots),
      _dot_len = _this.opt.num,
      _all_len,
      dot1,
      dot2;

    while (_dot_len--) { // 操作每一个离子，不包括鼠标“粒子”
      dot1 = _this.dots[_dot_len];

      // 离子位移
      dot1.x += dot1.xa;
      dot1.y += dot1.ya;

      // 遇到边界反向
      if (dot1.x > _this.canvasRect.w - _this.opt.dotRadius || dot1.x < _this.opt.dotRadius) {
        dot1.xa *= -1;
      }
      if (dot1.y > _this.canvasRect.h - _this.opt.dotRadius || dot1.y < _this.opt.dotRadius) {
        dot1.ya *= -1;
      }

      // 绘制粒子
      _this.ctx.beginPath();
      _this.ctx.fillStyle = dot1.color;
      _this.ctx.arc(dot1.x, dot1.y, _this.opt.dotRadius, 0, Math.PI * 2, true);
      _this.ctx.fill();

      // 对比当前粒子与其他粒子距离
      _all_len = _all_dots.length;
      while (_all_len--) {
        dot2 = _all_dots[_all_len];

        // 遇到当前粒子 或者 鼠标粒子为空跳过
        if (dot2 === dot1 || !dot2.x) continue;

        // 2个粒子之间的距离
        var _dis_x = dot2.x - dot1.x,
          _dis_y = dot2.y - dot1.y,
          distans = Math.sqrt(_dis_x * _dis_x + _dis_y * _dis_y),
          ratio = (dot2.dotPower - distans) / dot2.dotPower;
        if (distans < dot2.dotPower) {
          // 如果是鼠标粒子，则移向鼠标粒子，且有加速度
          if (dot2 === _this.mousePoint && distans > _this.opt.mouseDistance) {
            dot1.x += _dis_x * ratio / 60;
            dot1.y += _dis_y * ratio / 60;
          }
          // 二点自之间连线
          _this.ctx.beginPath();
          _this.ctx.lineWidth = _this.opt.lineWidth * ratio;
          _this.ctx.strokeStyle = dot2.color;
          _this.ctx.moveTo(dot2.x, dot2.y);
          _this.ctx.lineTo(dot1.x, dot1.y);
          _this.ctx.stroke();
        }
      }
    }

    g.RAF(_this.animate.bind(_this));
  };

  // 暴露粒子对象给全局
  g.ParticleBg = ParticleBg;
}(this, document);