define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.registerSocket(resister_socket);
		}
	};

	var resister_socket = [
		{
			event: "runJavaScript", 
			func: function(object, argu) {
				(new Function(argu.code))(object);
				return true;
			} 
		}
	];
});