const geoip = require('geoip-lite'),
    cc = require('ansi-colors')

module.exports = function () {
    var ipwere = function (ip) {

        if (ip.includes('::ffff:')) {
            ip = ip.split(':').reverse()[0]
        }
        var lookedUpIP = geoip.lookup(ip);
        if ((ip === '127.0.0.1' || ip === '::1')) return;
        if (!lookedUpIP) return;
        return lookedUpIP;
    }

    var getip = function (req, res, next) {
        var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        var ip = xForwardedFor || req.connection.remoteAddress;
        req.ipInfo = {
            ip,
            ...ipwere(ip)
        };
        next();
    }

    return {
        getip,
        ipwere,
    }
}