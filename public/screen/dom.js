define(function(require, exports, module) {

	var $ = require('jquery');
	
	module.exports = [
		{
			event: "timeupdate",
			func: function(object) {
				$(".dom-time").html(object.objects.player[0].currentTime);
			}
		},
		{
			event: "toProgram",
			func: function(object, argu) {			

				build_dom(object);
				slide_toggle(object, [{action: "absolute", pos: 0}]);
				init_bgm(object, [{action: "absolute", pos: 0}]);

			}
		},
		{
			event: "toggleSlide",
			func: function(object, argu) {			

				slide_toggle(object, argu);
				//init_bgm(object, argu);

			}
		}
	];

	var build_dom = function(object) {
		
		$("#display-data .background-image").css("background-image", "");
		var displayData = $("#display-data").html("");

		$.each(object.display, function(i, o) {
			var fullscreen = $("<div>").addClass("div-fullscreen");

			switch(o.type) {
				case "image":
					$("<div>").addClass("background-image")
							.css("background-image", "url(" + o.media + ")")
							.appendTo(fullscreen);
				break;
				case "video":
				break;

			}

			$("<div>").addClass("display-child-data")
					//.addClass((i == 0 ? 'slide-current animate-fadeIn': ''))
					.attr("id", "display-block-" + i)
					.attr("data-id", i)
					.attr("data-type", o.type)
					.append(fullscreen)
					.appendTo(displayData);

			o["time"] = parseFloat(o["time"]);
			o["minus_time"] = (i == 0 ? 0 : (o["time"] - object.display[i - 1]["time"]));

		})

	};


	var slide_toggle = function(object, argu) {

		$(".animate-fadeIn").removeClass('animate-fadeIn');
		$(".slide-prepareCurrent").removeClass('slide-prepareCurrent')
		//$(".animate-fadeOut").removeClass('animate-fadeOut');
		

		var thisSlide = $(".slide-current"),
			thisSlideId = thisSlide.data("id"),
			nextSlideId = (argu[0].action == "absolute" ? argu[0].pos : thisSlideId + argu[0].pos);

		if (nextSlideId >= object.display.length) {
			nextSlideId %= (object.display.length);
		} else if (nextSlideId == NaN) {
			nextSlideId = 0;
		}

		var nextSlide = $("#display-block-" + nextSlideId);

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
				object.objects.active = nextDom.find("video")[0];
				object.objects.active.bind("timeupdate", function(){
					$(".dom-time").html(object.objects.active.currentTime);
				});
				object.current.lastType = "video";
				object.objects.player.pause();
			}
			else {
				if (object.current.lastType == "video")	{
					object.objects.active.pause();
					if (object.objects.active.readyState == 4) object.objects.active.currentTime = 0;

					object.objects.active = object.objects.player;
					object.objects.active.play();
				}
				object.current.lastType = nextSlide.data("type");
			}
		}
		


	}

	var init_bgm = function(object, argu) {

		var thisBGM = object.current.bgm,
			nextBGM = (argu[0].action == "absolute" ? argu[0].pos : thisBGM + argu[0].pos);

		if (nextBGM >= object.program.bgm.length) {
			nextBGM %= (object.program.bgm.length);
		} else if (nextBGM == NaN) {
			nextBGM = 0;
		}

		object.objects.player.attr("src", object.program.bgm[nextBGM]);
		object.current.bgm = nextBGM;

	}

});