var http = require('http'),
    url = require('url'),
    router = require('./router.js');

http.createServer(function(req, res) {
    // var pathname = url.parse(req.url).pathname;
    req.setEncoding("utf8");
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    router.router(req, res, url.parse(req.url).pathname);
}).listen(8080);
// }).listen(8080, "127.0.0.1"); 第二个参数不要的情况就是默认网址
console.log("运行在：http://localhost:8080/");
