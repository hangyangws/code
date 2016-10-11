var ParseDns = require('./parse_dns.js'),
    MainIndex = require('./main_index.js');

exports.router = function(req, res, pathname) {
    switch (pathname) {
        case "/parse":
            ParseDns.parseDns(req, res);
            break;
        default:
            MainIndex.goIndex(req, res);
    }
};
