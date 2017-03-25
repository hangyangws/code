window.onload = function() {
    var r = Raphael("main", 500, 500),
        angle = 0;
    while (angle < 360) {
        var color = Raphael.getColor();
        (function(t, c) {
            r.circle(250, 460, 20).attr({
                stroke: c,
                fill: c,
                transform: t,
                "fill-opacity": .4
            }).click(function() {
                s.animate({
                    transform: t,
                    stroke: c
                }, 2000, "bounce");
            }).mouseover(function() {
                this.animate({
                    "fill-opacity": .8
                }, 400);
            }).mouseout(function() {
                this.animate({
                    "fill-opacity": .4
                }, 400);
            });
        })("r" + angle + " 250 250", color);
        angle += 30;
    }
    Raphael.getColor.reset();
    // s 作为一个组集 可以一起赋值 和操作
    var s = r.set();
    s.push(r.path("M250,250c50,100,-50,100,0,190").attr({
        fill: "none",
        "stroke-width": 2
    }));
    s.push(r.circle(250, 460, 20).attr({
        fill: "none",
        "stroke-width": 2
    }));
    s.push(r.circle(250, 250, 5).attr({
        fill: "none",
        "stroke-width": 10
    }));
    s.attr({
        stroke: Raphael.getColor()
    });
};
