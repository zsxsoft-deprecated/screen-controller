define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program'),
		dom = require('screen/dom'),
		socket = require('screen/socket');

	$(function() {
		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		});
		dom.init(program);
		socket.init(program);

		// debug
		window.program = program;
	});


});