"use strict";

module.exports = function() {
	return ({
		ignore: [
			'/public/.*'
		],
		dependencies: {},
		route: [
			'config/client.js'
		],
		cdn: [
			{
				path: '/client/',
				priority: 2,
				source: 'public'
			}
		],
		import: [
			{
				module: 'generic',
				as: 'webapp',
				path: '/entity/webapp.js'
			},
			{
				module: 'generic',
				as: 'placeholder',
				path: '/entity/placeholder.js'
			}
		]
	});
};
