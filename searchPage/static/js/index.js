/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-08-16.
 */

;
! function(g, doc, undefined) {
  'use strict';
  var $main = doc.querySelector('#main'),
    $ipt = $main.querySelector('.search-ipt'), // 输入框Dom
    $chrome = $main.querySelector('.js-chrome'),
    $baidu = $main.querySelector('.js-baidu'),
    _user_obj = (function() {
      var _query_obj = g.getQueryObj(),
        _obj = {
          name: null,
          animate: false
        };
      if (_query_obj) {
        _query_obj.name && (_obj.name = _query_obj.name);
        _query_obj.animate && (_obj.animate = _query_obj.animate);
      }
      return _obj;
    })(),
    // 搜索框相应参数与方法
    now = new Date(),
    _ipt_time = {
      time1: null,
      time2: null
    },
    Project = {
      init: function() {
        // 用户名
        $main.querySelector('.js-name').innerHTML = Project.getGreeting() + (_user_obj.name ? '，' + _user_obj.name : '');

        // 每日一句
        $main.querySelector('.js-greet').innerHTML = [
          '星期日，明天就要上班了',
          '星期一，怎么那么多任务要完成',
          '星期二，好好上班，梦在前方',
          '星期三，测试提交了好多BUG',
          '星期四，还有一天就放假了',
          '星期五，算了还是明天加班吧',
          '星期六，看了朋友圈我觉得他们会失去本宝宝'
        ][now.getDay()];

        // 输入框聚焦
        $ipt.focus();

        // 检测是否要背景动画
        _user_obj.animate && ($main.className = $main.className + ' bg-animate');

        // 动画背景
        var particleBg = new ParticleBg({
          el: doc.querySelector('#bgAnimate'),
          num: 50, // 粒子数量
          mouseDistance: 60, // 鼠标和粒子之间最小
          dotPower: 120, // 粒子之间什么距离会有吸引
          dotAcceleration: 1, // 离子加速度
          dotRadius: 2, // 粒子半径
          lineWidth: .8 // 粒子连线最大宽度
        });
      },
      getGreeting: function() {
        var hour = now.getHours();
        if (hour < 11) {
          return 'Good morning';
        }
        if (hour < 16) {
          return 'Good Afternoon';
        }
        return 'Good evening';
      },
      getValArr: function() {
        return $ipt.value.replace(/(^\s*)|(\s*$)/g, '').split(/\s+/);
      },
      go: function(e) {
        e = e || g.event;
        if ((e.keyCode || e.which) === 13) {
          if (_ipt_time.time1) {
            _ipt_time.time2 = new Date().getTime();
          } else {
            _ipt_time.time1 = new Date().getTime();
            var _time = setTimeout(function() {
              clearTimeout(_time);
              if (_ipt_time.time2 && (_ipt_time.time2 - _ipt_time.time1 < 320)) {
                Project.chrome();
              } else {
                Project.baidu();
              }
              _ipt_time.time1 = null;
              _ipt_time.time2 = null;
            }, 340);
          }
        }
      },
      chrome: function() {
        g.location.href = 'https://www.google.com/#q=' + Project.getValArr().join('+');
      },
      baidu: function() {
        g.location.href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + encodeURI(Project.getValArr().join(' '));
      }
    };

  Project.init(); // 搜索初始化
  g.addEvent($ipt, 'keydown', Project.go); // 用户搜索
  g.addEvent($chrome, 'click', Project.chrome); // 点击谷歌
  g.addEvent($baidu, 'click', Project.baidu); // 点击百度
}(this, document);