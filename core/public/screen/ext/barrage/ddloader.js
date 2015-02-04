define(function(require, exports, module) {

	/* 
	 * This function based on DDPlayer Project
	 * https://github.com/dpy1123/ddplayer
	 */

	var DD = require('./ddplayer'),
		plugins = [
			require('./sprite'),
			require('./frame'),
			require('./comment'),
			require('./commentframe'),
			require('./player')
		];

	$.each(plugins, function(i, v) {
		console.log(v);
		v.init.call(this, DD);
	});

	module.exports = DD;

});