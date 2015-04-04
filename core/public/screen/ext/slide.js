define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};

	var registerFunction = [
		{
			event: "toProgram",
			func: function(argu) {
				this.toggleSlide({action: "absolute", pos: 0});
			}
		},
		{
			event: "toggleSlide",
			func: function(argu) {		
				slideToggle.apply(this, argu);
			}
		}
	];

	var registerSocket = [
		{
			event: "toggleSlide", 
			func: function(data) {
				this.toggleSlide(data.param);
				return true;
			} 
		}
	];

	var slideToggle = function(argu) {

		var that = this;
		
		if (this.display.length == 0) return;


		$(".slide-prepareCurrent").removeClass('slide-prepareCurrent')
		//$(".animate-fadeOut").removeClass('animate-fadeOut');
		

		var thisSlide = $(".slide-current"),
			thisSlideId = this.current.display,//thisSlide.data("id"),
			nextSlideId = (argu.action == "absolute" ? argu.pos : thisSlideId + argu.pos);

		if (nextSlideId >= this.display.length) {
			nextSlideId %= (this.display.length);
		} else if (nextSlideId == NaN || nextSlideId < 0) {
			nextSlideId = 0;
		}

		var nextSlide = $("#display-block-" + this.display[nextSlideId].dom_id);

		if (nextSlideId != thisSlideId) {
			
			nextSlide.addClass("slide-current")
			    	 .show()
			    	 //.fadeIn("fast")
			    	 //.children(0)
			    	 .addClass("animate-fadeIn");
						 //.removeClass("animate-fadeIn animate-fadeOut");

			thisSlide.addClass('slide-prepareCurrent')
					 .removeClass('slide-current')
					 //.children(0)
			//		 .fadeOut("slow", function() {
			//		 	$(this).removeClass('slide-prepareCurrent')
			//		 })
					 //.addClass("animate-fadeOut")

			// BGM must be check after scroll
			if (nextSlide.data("type") == "video") {
				this.objects.active = nextSlide.find("video");
				this.objects.active.bind("timeupdate", function(){
					$(".dom-time").html(that.objects.active[0].currentTime);
				});
				this.current.lastType = "video";

				this.objects.player[0].pause();
			}
			else {
				if (this.current.lastType == "video")	{
					this.objects.active[0].pause();
					if (this.objects.active[0].readyState == 4) this.objects.active[0].currentTime = 0;

					this.objects.active = this.objects.player;
					this.objects.active[0].play();
				}
				this.current.lastType = nextSlide.data("type");
			}
		}

		setTimeout(function() {
			nextSlide.removeClass('animate-fadeIn');
		}, config.program.fadeTimeout);
		this.current.display = nextSlideId;
		


	}

});