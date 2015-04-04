define(function(require, exports, module) {

	var domIndex = 0;

	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSocket(registerSocket);
		}
	};

	var registerFunction = [{
		event: "toProgram",
		func: function(argu) {

			domBuilder.apply(this);
			$(".dom-playing-name").text(this.program.program.name);
			$(".dom-playing-player").text(this.program.player.class + " " + this.program.player.name);

		}
	}];

	var registerSocket = [{
		event: "toProgram",
		func: function(data) {
			this.toProgram(data.param.pos);
			return true;
		}
	}];


	var domBuilder = function() {

		var self = this;

		if (!this.current.index) {
			this.display.unshift({
				index: true,
				media: "",
				type: "default"
			});
			this.current.index = true;
			$("#display-data").css("background", "");
		} else {
			if (this.display[0].type == "image") {
				//$("#display-data").css("background", "url(" + encodeURI(this.display[0].media) + ")");
				// 淡入淡出效果，用于下一帧背景
			} else {
				$("#display-data").css("background", "");
			}
		}

		$(".display-child-data").addClass("animate-fadeOut"); // 淡出

		// 以下是一部分DOM元素的缓存，定时删除。
		
		var origData = $("#display-data").children();
		var origBackgroundImage = $("#display-data .background-image");
		var displayData = $("#display-data");


		$.each(self.display, function(i, o) {

			var fullscreen = $("<div>").addClass("div-fullscreen " + (i === 0 ? ' slide-current' : ''));

			switch (o.type) {
				case "image":
					$("<div>").addClass("background-image")
						.css("background-image", "url(" + encodeURI(o.media) + ")")
						.appendTo(fullscreen);
					break;
				case "video":
					$("<div>").addClass("background-image")
						.css("background-color", "#000000")
						.append($("<video>").attr("src", encodeURI(o.media))
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
				case "custom":
					o.custom.call(self, fullscreen);

			}

			$("<div>").addClass("display-child-data display-child-fullscreen " + (i === 0 ? ' animate-fadeIn ' : ''))
				.attr("id", "display-block-" + domIndex)
				.attr("data-id", i)
				.attr("data-type", o.type)
				.append(fullscreen)
				.appendTo(displayData);

			o.time = parseFloat(o.time);
			o.minus_time = (i === 0 ? 1 : (o.time - self.display[i - 1].time));
			o.dom_id = domIndex;
			domIndex++;

		});

		var timeoutFn = function() {
			origBackgroundImage.css("background-image", ""); // 内存清理
			origData.remove();
			//$(".animate-fadeIn").removeClass("animate-fadeIn");
		};

		setTimeout(timeoutFn, config.program.fadeTimeout);
	};
});