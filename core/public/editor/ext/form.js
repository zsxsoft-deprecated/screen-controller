define(function(require, exports, module) {

	module.exports = {
		init: function() {
			var me = this;

			me.submit = {};
			me.registerSubmit = function(param) {
				var me = this;
				$.each(param, function(i, value) {
					me.submit[value.event] = value.func;
				});
				return this;
			};

			$("form").on("submit", function() {
				console.log(this);
				me.submit[$(this).data("function")].call(me, this);
				return false;
			});

		}
	};



});