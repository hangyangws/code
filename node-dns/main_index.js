var fs = require('fs'),
    url = require('url');

exports.goIndex = function(req, res) {
    var path = __dirname + '/' + url.parse('search.html').pathname,
        data = fs.readFileSync(path);
    res.end(data);
}
