"use strict";

module.exports = function(config) {
	var load = {
		worker: ['generic', 'client']
	};

	return ({
		repository: {
			server: {
				url: '' // tmp
			},
			modules: [
				{
					name: 'generic',
					repo: 'https://github.com/anzerr/Module_Generic.git',
					commit: '24a5e76a8b211001c2edaad72cffed6195300d6f'
				}
			]
		},
		skipPrivate: config.skipPrivate || false,
		path: {
			module: config.path.app + '/module',
			remote: config.path.cache + '/module'
		},
		load: load[config.moduleProfile || config.appProfile]
	});
};
