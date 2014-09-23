define(function(require, exports, module) {
	
	module.exports = [
		{
			event: "timeupdate",
			func: function(object) {
				object.$(".dom-time").html(object.objects.player[0].currentTime);
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
		},
		{
			event: "toggleMusic",
			func: function(object, argu) {			

				init_bgm(object, argu);

			}
		},
		{
			event: "timeupdate",
			func: function(object, argu) {			

				auto_toggle(object);

			}
		}
	];

	var auto_toggle = function(object) {

		time = object.display[object.current.display]["time"];
		if (time) {

			var curTime = object.objects.player[0].currentTime, 
				minusTime = Math.abs(time - curTime);
			console.log('currentTime:' + curTime + ', nextTime:' + time + ', minusTime:' + minusTime);

			if (minusTime <= 1) {
				
				if (object.current.repeat) {
					var tmp = object.$.extend({}, object.display[object.current.display]); 
					tmp["time"] = object.display[object.display.length - 1]["time"] + tmp["minus_time"];
					object.display.push(tmp);
					console.log("Add a repeat obj: ");
					console.log(tmp);
				}

				object.toggleSlide({action: "", pos: 1});

			}
			
		}

	}

	var build_dom = function(object) {
		var $ = object.$;

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
					$("<div>").addClass("background-image")
							  .append($("<video>").attr("src", o.media)
							  		              .height('100%'))
							  		              //.width(document.documentElement.clientWidth)
							  		              //.height(document.documentElement.clientHeight))
							  .appendTo(fullscreen);
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
			o["minus_time"] = (i == 0 ? 1 : (o["time"] - object.display[i - 1]["time"]));
			o["dom_id"] = i;

		})

	};


	var slide_toggle = function(object, argu) {

		var $ = object.$;

		$(".animate-fadeIn").removeClass('animate-fadeIn');
		$(".slide-prepareCurrent").removeClass('slide-prepareCurrent')
		//$(".animate-fadeOut").removeClass('animate-fadeOut');
		

		var thisSlide = $(".slide-current"),
			thisSlideId = object.current.display,//thisSlide.data("id"),
			nextSlideId = (argu[0].action == "absolute" ? argu[0].pos : thisSlideId + argu[0].pos);

		console.log("this: " + thisSlideId + ",  next: " + nextSlideId + ",   pos:" + argu[0].pos);
		if (nextSlideId >= object.display.length) {
			nextSlideId %= (object.display.length);
		} else if (nextSlideId == NaN) {
			nextSlideId = 0;
		}
		console.log("this: " + thisSlideId + ",  next: " + nextSlideId + ",   pos:" + argu[0].pos);

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