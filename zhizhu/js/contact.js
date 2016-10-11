/**
 * created by fengjie in 2016-01-20
 */
;
! function($) {
    "use strict";
    var contact = (function() {
        var markerArr = [{
            title: "成都蜘蛛网工作室",
            content: "竭诚为您服务，我们在这里，我们在等待",
            point: "104.068944|30.580294",
            isOpen: 1,
            icon: {
                w: 23,
                h: 25,
                l: 0,
                t: 21,
                x: 9,
                lb: 12
            }
        }];
        return {
            ini: function() {
                contact.createMap(); //创建地图
                contact.setMapEvent(); //设置地图事件
                contact.addMapControl(); //向地图添加控件
                contact.addMarker(); //向地图中添加marker
            },
            createMap: function() {
                // 创建地图函数
                var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
                var point = new BMap.Point(104.068944, 30.580294); //定义一个中心点坐标
                map.centerAndZoom(point, 15); //设定地图的中心点和坐标并将地图显示在地图容器中
                window.map = map; //将map变量存储在全局
            },
            setMapEvent: function() {
                // 地图事件设置函数
                map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
                map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
                map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard(); //启用键盘上下左右键移动地图
            },
            addMapControl: function() {
                // 地图控件添加函数
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE
                });
                map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    isOpen: 0
                });
                map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                });
                map.addControl(ctrl_sca);
            },
            addMarker: function() {
                // 创建marker
                for (var i = 0; i < markerArr.length; i++) {
                    var json = markerArr[i];
                    var p0 = json.point.split("|")[0];
                    var p1 = json.point.split("|")[1];
                    var point = new BMap.Point(p0, p1);
                    var iconImg = contact.createIcon(json.icon);
                    var marker = new BMap.Marker(point, {
                        icon: iconImg
                    });
                    var iw = contact.createInfoWindow(i);
                    var label = new BMap.Label(json.title, {
                        "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
                    });
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    label.setStyle({
                        borderColor: "#808080",
                        color: "#333",
                        cursor: "pointer"
                    });

                    (function() {
                        var index = i;
                        var _iw = contact.createInfoWindow(i);
                        var _marker = marker;
                        _marker.addEventListener("click", function() {
                            this.openInfoWindow(_iw);
                        });
                        _iw.addEventListener("open", function() {
                            _marker.getLabel().hide();
                        })
                        _iw.addEventListener("close", function() {
                            _marker.getLabel().show();
                        })
                        label.addEventListener("click", function() {
                            _marker.openInfoWindow(_iw);
                        })
                        if (!!json.isOpen) {
                            label.hide();
                            _marker.openInfoWindow(_iw);
                        }
                    })()
                }
            },
            createInfoWindow: function(i) {
                // 创建InfoWindow
                var json = markerArr[i];
                var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
                return iw;
            },
            createIcon: function(json) {
                // 创建一个Icon
                var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
                    imageOffset: new BMap.Size(-json.l, -json.t),
                    infoWindowOffset: new BMap.Size(json.lb + 5, 1),
                    offset: new BMap.Size(json.x, json.h)
                })
                return icon;
            }
        };
    })();
    // 页面初始化
    contact.ini();
    // 背景图动画
    $('<img/>').attr('src', 'img/about-bg.jpg').load(function() {
        $('#intro').addClass('active');
    });
}(jQuery);
