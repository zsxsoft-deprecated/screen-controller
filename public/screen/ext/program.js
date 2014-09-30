define(function(require, exports, module) {
	
	module.exports = {
		init: function(object) {
			object.register(resister_function);
		}
	};

	var resister_function = [
		{
			event: "toProgram",
			func: function(object, argu) {			

				build_dom(object);
				object.$(".dom-playing-name").text(object.program.program.name);
				object.$(".dom-playing-player").text(object.program.player.class + " " + object.program.player.name);

			}
		}
	];

	var build_dom = function(object) {
		var $ = object.$;

		$("#display-data .background-image").css("background-image", "");
		var displayData = $("#display-data").html("");

		if (!object.current.index) {

			object.display.unshift({
				display_type: "full-screen",
				index: true,
				media: "",
				message: "",
				type: "default"
			});		
			object.current.index = true;
		}

		$.each(object.display, function(i, o) {
			var fullscreen = $("<div>").addClass("div-fullscreen " + (i == 0 ? ' slide-current' : ''));

			switch(o.type) {
				case "image":
					$("<div>").addClass("background-image")
							.css("background-image", "url(" + o.media + ")")
							.appendTo(fullscreen);
				break;
				case "video":
					$("<div>").addClass("background-image")
							  .css("background-color", "#000000")
							  .append($("<video>").attr("src", o.media)
							  		              .width('100%')
							  		              .height('100%')
							  		              //.css("transform", "scaleX(2)")
							  		 )
							  		              //.width(document.documentElement.clientWidth)
							  		              //.height(document.documentElement.clientHeight))
							  .appendTo(fullscreen);
				break;
				case "default":
					fullscreen.addClass("cover-container")
							  .css("background-color", "#333")
						      .append($("<div>")
						      	.addClass("inner")
							  	.html("<h1 class=\"dom-playing-name title-name cover-heading\"></h1><code class=\"lead dom-playing-player title-player yahei-font\"></code>")
							  );
				break;

			}
			$("<div>").addClass("display-child-data display-child-fullscreen")
					//.addClass((i == 0 ? 'slide-current animate-fadeIn': ''))
					.attr("id", "display-block-" + i)
					.attr("data-id", i)
					.attr("data-type", o.type)
					.append(fullscreen)
					.appendTo(displayData);

			o["time"] = parseFloat(o["time"]);
			o["minus_time"] = (i == 0 ? 1 : (o["time"] - object.display[i - 1]["time"]));
			o["dom_id"] = i;

		});
	};
});