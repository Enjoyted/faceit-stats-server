"use strict";

// basic config file
module.exports = function(config) {
    config.path = {
		'node': '',
		'root': appRoot.engine,
		'project': appRoot.project,
		'config': appRoot.project + '/config.js',
		'engine': appRoot.engine + '/engine',
		'base': appRoot.engine + '/engine/base',
		'npm': appRoot.engine + '/engine/node_modules',
		'core': appRoot.engine + '/engine/core',
		'lib': appRoot.engine + '/engine/core/lib',
		'docker': appRoot.engine + '/engine/core/docker',
		'public': appRoot.project + '/public',
		'hyperion': appRoot.engine + '/engine/core/hyperion',
		'hypeConfig': appRoot.project + '/resources/cache/hyperion/config',
		'bootstrap': appRoot.project + '/bootstrap',
		'app': appRoot.project + '',
		'resources': appRoot.project + '/resources',
		'keys': appRoot.project + '/resources/keys',
		'assets': appRoot.project + '/resources/assets',
		'cache': appRoot.project + '/resources/cache',
		'log': config.LOG_PATH || (appRoot.project + '/resources/logs')
	};

	var fs = require('fs');
	try {
		config.session = fs.readFileSync(config.path.resources + '/.machineSession').toString();
	} catch(e) {
		// don't care, it gets created later if it doesn't exist
	}

    var pJson = require(config.path.engine + '/package.json');

    $.schema.merge(config, {
        machineName: $.is.default(config.machineName, 'worker'),
        prefix: $.is.default(config.prefix, 'sig'),
		port: Number($.is.default(config.port, 80)),
		upstartWrap: $.is.default(config.upstartWrap, true),
		skipPrivate: $.is.default(config.skipPrivate, false),

        entry: $.is.default(config.entry, '127.0.0.1:80'),
		name: $.is.default(config.name, 'none'),
		appProfile: $.is.default(config.appProfile, 'worker'),

        app: {
            version: pJson.version, // interaction . release . hotfix
            author: pJson.author.toLowerCase(),
            name: pJson.name.toLowerCase(),
            startup: new Date().getTime()
        }
    });

	// base config
	var base = {
		configSeed: $.schema.copy(config),
		path: config.path,
		app: config.app,
		env: {
			stdout: config.stdoutLogger || null,
			lang: 'FR',
            node: {
				version: process.version
            },
			entry: config.entry,
			bootstrap: config.path.bootstrap + '/',
			upstart: config.upstartWrap,
			profile: config.appProfile,
            session: config.session,
            machine: config.machineName,
			name: config.name,
			worker: config.workerID || 'master',
			local: config.isLocal
		},
		crypto: {
			type: 'sha1',
            salt: 'SALT',
            sub: 8
		},
		log: {
			saveType: 'file',
            path: config.path.log
		},
		require: {
			path: config.path
		},
		uniqueKey: {
			time: 1459433440765, // To regenerate "new Date() - 0" if you update this bump up the version
			version: 1
		},
		closure: {
			core: {
				path: 'core!closure/closure-compiler-v20161024.jar'
			},
			build: {}
		}
	};

    // load sub config
    var loadConfig  = {
		server: config.path.app + '/config/server.js',
		module: config.path.app + '/config/module.js'
    };
	for (var i in loadConfig) {
		base[i] = require(loadConfig[i])(config);
	}

	return (base);
};
