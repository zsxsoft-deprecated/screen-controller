define(function(require, exports, module) {

	// The logic is too simple
	// So.. Two files is enough?

	var controller = require('controller/controller');

	$(function() {
		
		window.controller = controller;
		controller.initSocket()
			      .initDom()
			      .audio = $("#dom-audio-test")[0];
	});


});