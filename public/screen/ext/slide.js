define(function(require, exports, module) {

	module.exports = {
		init: function(object) {
			object.register(register_function);
			object.registerSocket(register_socket);
		}
	};

	var register_function = [
		{
			event: "toProgram",
			func: function(object, argu) {
				object.toggleSlide({action: "absolute", pos: 0});
			}
		},
		{
			event: "toggleSlide",
			func: function(object, argu) {		
				slide_toggle(object, argu);
			}
		}
	];

	var register_socket = [
		{
			event: "toggle", 
			func: function(object, data) {
				object.toggleSlide({action: "", pos: data.pageplus});
				return true;
			} 
		}
	];

	var slide_toggle = function(object, argu) {

		if (object.display.length == 0) return;

		var $ = object.$;


		$(".animate-fadeIn").removeClass('animate-fadeIn');
		$(".slide-prepareCurrent").removeClass('slide-prepareCurrent')
		//$(".animate-fadeOut").removeClass('animate-fadeOut');
		

		var thisSlide = $(".slide-current"),
			thisSlideId = object.current.display,//thisSlide.data("id"),
			nextSlideId = (argu[0].action == "absolute" ? argu[0].pos : thisSlideId + argu[0].pos);

		if (nextSlideId >= object.display.length) {
			nextSlideId %= (object.display.length);
		} else if (nextSlideId == NaN) {
			nextSlideId = 0;
		}

		var nextSlide = $("#display-block-" + object.display[nextSlideId].dom_id);

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
				object.objects.active = nextSlide.find("video");
				object.objects.active.bind("timeupdate", function(){
					$(".dom-time").html(object.objects.active[0].currentTime);
				});
				object.current.lastType = "video";

				object.objects.player[0].pause();
			}
			else {
				if (object.current.lastType == "video")	{
					object.objects.active[0].pause();
					if (object.objects.active[0].readyState == 4) object.objects.active[0].currentTime = 0;

					object.objects.active = object.objects.player;
					object.objects.active[0].play();
				}
				object.current.lastType = nextSlide.data("type");
			}
		}

		object.current.display = nextSlideId;
		


	}

});