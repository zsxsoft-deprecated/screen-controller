define(function(require, exports, module) {
	
	module.exports = {
		init: function() {
			this.register(registerFunction);
		}
	};

	var registerFunction = [
		{
			event: "toProgram",
			func: function() {
				buildSidebar.apply(this, arguments);		
			}
		}
	];

	var buildSidebar = function(highlightId) {
		var programs = this.programs,
			dom = $("#sidebar").html(""),
			dataBind = dom.data("bind");
		programs.sort(function(a, b) {
			return parseInt(a.sort) > parseInt(b.sort);
		});
		if (dataBind != "bind") bindSideBar.call(this, dom);
		$.each(programs, function(i, v) {
			$("<a>").data("id", v.id)
					.data("aryId", i)
					.attr("href", "#")
					.html(v.program.name)
					.appendTo($("<li>").addClass("item " + (highlightId == i ? "active" : "")).appendTo(dom));
		})
	}

	var bindSideBar = function(dom) {
		var me = this;
		dom.on('click', '.item', function() {
			me.toProgram($(this).children("a").data("aryId"));
		}).data("bind", "bind");
	}



});