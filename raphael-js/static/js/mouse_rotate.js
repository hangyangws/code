Raphael(function() {
    var paper = Raphael('main', 500, 500),
        rect = [],
        length = 10,
        color;
    for (var i = 0; i < length; i++) {
        color = Raphael.getColor();
        rect[i] = paper.rect(0, 249, 500, 2).attr({
            fill: color,
            'stroke-width': 0,
            'opacity': .8
        });
    }
    paper.circle(250, 250, 10).animate({
        fill: '#333',
        stroke: '#000',
        'stroke-width': 40,
        'stroke-opacity': .4
    }, 1000, 'elastic');
    var firstPoint = 0,
        changeAngel = 0;
    window.onmousemove = function(e) {
        e = e || window.event;
        if (firstPoint == 0) {
            firstPoint = e.clientX;
            return;
        }
        changeAngel += e.clientX - firstPoint;
        for (i = 0; i < length; i++) {
            rect[i].attr({
                transform: 'r' + changeAngel * (i + 1)
            });
        }
        // 开始旋转
        firstPoint = e.clientX
    }
});
