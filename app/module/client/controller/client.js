"use strict";

module.exports = function($) {
	return $.require([
		'import!placeholder'
	], function(
		placeholder
	) {

		var obj = function() {};
		obj.prototype = $.extends('!controller', {
			index: function() {
				return (this.file({contentDisposition: 'inline', path: $.path('module!/public/index.html')}));
			},

			fav: function() {
				const self = this;
				return (placeholder.get('64x64').then(function(path) {
					return (self.file({contentDisposition: 'inline', path: $.path(path)}));
				}, function() {
					return (self.res().status(404).data({error: 'error creating placeholder image'}));
				}));
			}
		});

		return ({'static private': obj});
	});
};
