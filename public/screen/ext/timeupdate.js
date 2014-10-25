define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(resisterFunction);
		}
	};

	var resisterFunction = [
		{
			event: "timeupdate",
			func: function(argu) {		
				$(".dom-time").html(this.objects.player[0].currentTime);
				autoToggle.apply(this);
			}
		},
	];

	var autoToggle = function() {

		if (this.display.length == 0) return;
		
		var time = this.display[this.current.display]["time"];
		if (!time) return;

		var curTime = this.objects.player[0].currentTime, 
			minusTime = Math.abs(time - curTime);

		console.log('currentTime:' + curTime + ', nextTime:' + time + ', minusTime:' + minusTime);

		// Toggle Slide
		if (minusTime <= 1) {
			if (this.current.repeat) {
				var tmp = $.extend({}, this.display[this.current.display]); 
				tmp["time"] = this.display[this.display.length - 1]["time"] + tmp["minus_time"];
				this.display.push(tmp);
				console.log("Add a repeat obj: ");
				console.log(tmp);
			}
			this.toggleSlide({action: "", pos: 1});
		}
	}

});