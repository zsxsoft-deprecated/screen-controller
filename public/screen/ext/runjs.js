define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.registerSocket(resister_socket);
		}
	};

	var resister_socket = [
		{
			event: "runjs", 
			func: function(object, argu) {
				data = argu[0];
				(new Function(data.code))(object);
				return true;
			} 
		}
	];
});