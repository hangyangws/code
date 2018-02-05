function getQueryObj() {
  var _search = decodeURI(location.search.slice(1)),
    _obj = {},
    getTrueValue = function(_v) {
      if (_v === 'false') {
        return false;
      }
      if (_v === 'true') {
        return true;
      }
      return _v;
    };
  _search = _search.split('&');
  var _l = _search.length,
    _temp;
  while (_l--) {
    _temp = _search[_l].split('=');
    _obj[_temp[0]] = getTrueValue(_temp[1]);
  }
  return _obj;
}

function cloneObj(obj) {
  var newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  }
  if (window.JSON) {
    return JSON.parse(JSON.stringify(obj));
  }
  for (var i in obj) {
    newobj[i] = typeof obj[i] === 'object' ?
      cloneObj(obj[i]) : obj[i];
  }
  return newobj;
}

! function(g, doc, undefined) {

  if (!g.RAF) {
    g.RAF =
      g.requestAnimationFrame ||
      g.webkitRequestAnimationFrame ||
      g.mozRequestAnimationFrame ||
      g.oRequestAnimationFrame ||
      g.msRequestAnimationFrame ||
      function(callBack) {
        g.setTimeout(callBack, 16.6);
      };
  }

  // 事件绑定函数
  if (!g.addEvent) {
    g.addEvent = (function() {
      if (g.addEventListener) {
        return function(element, type, handler) {
          element.addEventListener(type, handler, false);
        }
      }
      if (g.attachEvent) {
        return function(element, type, handler) {
          element.attachEvent('on' + type, handler);
        }
      }
      return function(element, type, handler) {
        element.addEventListener(type, handler, false);
        element['on' + type] = handler;
      }
    })();
  }
}(this, document);