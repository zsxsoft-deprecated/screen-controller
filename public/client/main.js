define(function(require, exports, module) {

	// The logic is too simple
	// So.. Two files is enough?

	var client = require('client/client');

	$(function() {
		
		window.client = client;
		client.initSocket()
			  .initDom()
			  .audio = $("#dom-audio-test")[0];
	});


});