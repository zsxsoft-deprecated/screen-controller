define(function(require, exports, module) {

	var IS_NW = (typeof(nwDispatcher) != 'undefined');

	if (IS_NW) {
		var NWGUI = nwDispatcher.requireNwGui();
	}

	module.exports = {
		init: function() {
			if (IS_NW) {
				$("body").css("-webkit-app-region", "drag");
			}
		}
	};


});