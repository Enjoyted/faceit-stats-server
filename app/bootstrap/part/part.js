"use strict";

$.require([
	'bootstrap!/part/info.js',
	'bootstrap!/part/response.js',
	'bootstrap!/part/scope.js'
], function(
	info,
	response,
	scope
) {

	module.exports = {
		info: info,
		response: response,
		scope: scope
	}
});