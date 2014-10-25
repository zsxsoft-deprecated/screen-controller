define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.registerSocket(registerSocket);
		}
	};

	var registerSocket = [
		{
			event: "initPage", 
			func: function() {
				location.reload();
				return true;
			} 
		}
	];
});