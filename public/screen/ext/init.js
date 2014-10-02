define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.registerSocket(register_socket);
		}
	};

	var register_socket = [
		{
			event: "initPage", 
			func: function(object) {
				location.reload();
				return true;
			} 
		}
	];
});