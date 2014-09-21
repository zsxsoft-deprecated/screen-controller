define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program'),
		dom = require('screen/dom'),
		socket = require('screen/socket');

	$(function() {
		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		}).register(dom).registerSocket(socket);

		// debug
		window.program = program;
	});


});