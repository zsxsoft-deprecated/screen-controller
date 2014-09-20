define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program'),
		dom = require('screen/dom')

	$(function() {
		program.objects.player = $("#dom-background-audio");
		program.init({
			socket: location.origin
		}).register(dom);

		// debug
		window.program = program;
	});


});