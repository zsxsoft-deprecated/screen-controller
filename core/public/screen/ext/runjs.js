define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.registerSocket(resisterSocket);
		}
	};

	var resisterSocket = [
		{
			event: "runJavaScript", 
			func: function(argu) {
				(new Function(argu.code)).apply(this);
				return true;
			} 
		}
	];
});