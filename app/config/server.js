"use strict";

module.exports = function(config) {
	return ({
		http: {
            ssl: false,
            optionCheck: false,
            ip: '0.0.0.0',
            port: config.port,
            sslPort: config.port + 363, // 443 with port 80

            // where to dump file uploads
            tmpPath: 'cache!/tmp/',

            maxSize: {
                json: $.size.megabyte(64).get,
                form: $.size.megabyte(1).get
            },

            partition: {
                api: [{
                    origin: ['0.0.0.0'], // '0.0.0.0' free all origin
                    pathReg: '^\/'
                }],
                cdn: []
            },
            
            key: '',
            cert: '',
            ca: null,
            ciphers: []
		},
		socket: {
            masterKey: ''
		},
		ws: {
            port: config.port + 100
		}
	});
};