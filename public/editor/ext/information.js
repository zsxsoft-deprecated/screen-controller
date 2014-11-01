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
			sql = {},
			player = {},
			program = {};

		sql['data_id'] = ary["program-id"];
		sql['data_player_name'] = player['name'] = this.program.player_name = this.program.player.name = ary["program-player-name"];
		sql['data_player_class'] = player['class'] = this.program.player_class = this.program.player.class = ary["program-player-class"];
		player['doom'] = this.program.player.doom = ary["program-player-doom"];
		sql['data_program_name'] = program['program'] = this.program.program.name = this.program.program_name = ary['program-name'];

		sql['data_player'] = JSON.stringify(player);
		sql['data_program'] = JSON.stringify(program);

		var ret = [];
		$.each(sql, function(i, v) {
			ret.push(" `" + i + "` = '" + v.replace("/'/g", '\\\'') + "' ");
		});
		ret = ret.join(",");
		
		this.runSql("UPDATE `" + this.tableName + '` SET ' + ret);
	}


});