define(function(require, exports, module) {
	
	var program = require('screen/program'),
		plugins = [

			require('ext/program'),
			require('ext/slide'),
			require('ext/bgm'),
			require('ext/time_update'),
			require('ext/send_status'),

			require('ext/runjs'),
			require('ext/init'),

			require('ext/highcharts'),

			require('ext/nwjs'),

			<% for (var o in config.extensions) { %>
			require('ext/<%=o%>'),
			<% } %>

		];

	window.Exception = function(errorMessage, data) {
		this.data = data;
		this.errorMessage = errorMessage;
		this.toString = function() {
			var objectString = "";
			if (typeof data == "object") {
				objectString = JSON.stringify(data); 
			} else if (typeof data == "undefined" || typeof data.toString == "undefined"){
				objectString = "";
			} else {
				objectString = data.toString();
			}
			return "Error: " + errorMessage + "\n\n" + objectString;
		};
	};

	$(function() {

		window.program = program;

		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		});

		$.each(plugins, function(i, v) {
			v.init.call(program);
		});

		// debug

	});


});