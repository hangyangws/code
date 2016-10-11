var qstring = require('querystring'),
    dns = require('dns');

exports.parseDns = function(req, res) {
    var postData = "";
    req.addListener('data', function(dadaChunk) {
        postData += dadaChunk;
    });
    req.addListener('end', function() {
        getDns(postData, function(domain, addr) {
            var html = '<!DOCTYPE html>' +
                '<html lang="zh-cmn-Hans">' +
                '<head>' +
                '<meta charset="UTF-8" />' +
                '<title>DNS解析器</title>' +
                '<style>' +
                'body {' +
                'padding: 0;' +
                'font-family: "微软雅黑";' +
                'font-size: 14px;' +
                'text-align: center;' +
                'color: #666' +
                '}' +
                'h2 {' +
                'padding: 0;' +
                'font-weight: normal;' +
                'height: 30px;' +
                'line-height: 30px;' +
                'margin: 50px 0 20px 0' +
                '}' +
                '</style>' +
                '</head>' +
                '<body>' +
                '<h2>DNS域名解析器 基于Node.js --- hangyangws</h2>' +
                '<div>域名：<em>' + domain + '</em></div>' +
                '<div>Ip：<em>' + addr.join(' , ') + '</em></div>' +
                '</body>' +
                '</html>';
            res.end(html);
            return;
        });
    });
}

function getDns(data, callBack) {
    var domain = qstring.parse(data).urlName;
    // qstring.parse(data) 是一个键值对对象
    // urlName 是form表单的name属性
    dns.resolve(domain, function(err, addr) {
        if (!addr) {
            addr = ['你解析的域名不存在'];
        }
        callBack(domain, addr);
    });
}
