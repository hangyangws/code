var getRandom = function(min, max) {
        return Math.random() * (max - min) + min;
    },
    getWinWidth = function() {
        return g.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
    },
    getWinHeight = function() {
        return g.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
    },
    getColor = function() {
        return 'rgba(RED, GREEN, BLUE, TRANS)'
            .replace('RED', getRandom(0, 255).toFixed(0))
            .replace('GREEN', getRandom(0, 255).toFixed(0))
            .replace('BLUE', getRandom(0, 255).toFixed(0))
            .replace('TRANS', .4);
    };


;
! function(g, undefined) {
    var RAF =
        g.RAF ||
        g.requestAnimationFrame ||
        g.webkitRequestAnimationFrame ||
        g.mozRequestAnimationFrame ||
        g.oRequestAnimationFrame ||
        g.msRequestAnimationFrame ||
        function(callBack) {
            g.setTimeout(callBack, 16.6);
        };
}(this);
