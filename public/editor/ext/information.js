define(function(require, exports, module) {
	
	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSubmit(registerSubmitFunction)
		}
	};

	var registerFunction = [
		{
			event: "toProgram",
			func: function() {
				buildInfo.apply(this, arguments);		
			}
		}
	];

	var registerSubmitFunction = [
		{
			event: "program-info",
			func: function(object) {
				submitForm.apply(this, arguments);

			}
		}
	];


	var buildInfo = function(id) {
		var program = this.programs[id];
		$("#program-id").val(program.id);
		$("#program-sort").val(program.sort);
		$("#program-name").val(program.program.name);
		$("#program-player-name").val(program.player.name);
		$("#program-player-class").val(program.player.class);
		$("#program-player-doom").val(program.player.doom);
	}
	
	var submitForm = function(object) {
		var me = this,
			ary = (function(ary) {
				var ret = {};
				$.each(ary, function(i, v) {
					ret[v.name] = v.value;
				});
				return ret;
			})($(object).serializeArray()),
			player = {},
			program = {};

		//ary["program-id"];
		this.program.id = ary['program-id'];
		this.program.sort = ary['program-sort'];
		player['name'] = this.program.player_name = this.program.player.name = ary["program-player-name"];
		player['class'] = this.program.player_class = this.program.player.class = ary["program-player-class"];
		player['doom'] = this.program.player.doom = ary["program-player-doom"];
		program['name'] = this.program.program.name = this.program.program_name = ary['program-name'];

		this.program.player = player;
		this.programs[this.programIndex] = $.extend({}, this.program);
		this.submitPrograms();

	}


});