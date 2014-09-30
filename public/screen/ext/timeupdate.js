define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.register(resister_function);
		}
	};

	var resister_function = [
		{
			event: "timeupdate",
			func: function(object, argu) {		
				$(".dom-time").html(object.objects.player[0].currentTime);
				auto_toggle(object);
			}
		},
	];

	var auto_toggle = function(object) {

		if (object.display.length == 0) return;
		
		var time = object.display[object.current.display]["time"];
		if (!time) return;

		var curTime = object.objects.player[0].currentTime, 
			minusTime = Math.abs(time - curTime);

		console.log('currentTime:' + curTime + ', nextTime:' + time + ', minusTime:' + minusTime);

		// Toggle Slide
		if (minusTime <= 1) {
			if (object.current.repeat) {
				var tmp = $.extend({}, object.display[object.current.display]); 
				tmp["time"] = object.display[object.display.length - 1]["time"] + tmp["minus_time"];
				object.display.push(tmp);
				console.log("Add a repeat obj: ");
				console.log(tmp);
			}
			object.toggleSlide({action: "", pos: 1});
		}
	}

});