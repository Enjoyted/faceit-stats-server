"use strict";

$.require([
	'core!/module.js',
	'core!/server.js',
    'core!/exit.js',
	'core!/serviceManager.js',

	'bootstrap!/part/part.js'
], function(
	module,
	server,
	exit,
	serviceManager,
	part
) {

	var e = new exit(), _s = {};
    part.info();
    var s = new server(), m = new module();

    var service = new serviceManager();
    _s.http = s.http({});

    var moduleScope = service.createScope('module').add({
        http: _s.http,
		exit: e,
        module: m
    });

	part.scope(moduleScope);

	m.loadPlugin(service.scope('module')).load($.config.get('module.load')).then(function() {
		console.log('loaded modules');

        _s.http.api(function(req, res) {
			res.set({
				"Access-Control-Allow-Origin": req.headers().origin || "*",
				"X-Frame-Options": "SAMEORIGIN",
				"X-XSS-Protection": "1; mode=block",
				"X-Content-Type-Options": "nosniff",
				"Referrer-Policy": "no-referrer",
				//"Content-Security-Policy": "script-src 'self'",
				"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range",
				"Access-Control-Expose-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range"
			});
			part.response(this, m, req, res);
        });
    });
});
