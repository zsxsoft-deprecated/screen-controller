define(function(require, exports, module) {

	module.exports = {
		init: function() {
			this.register(registerFunction);
			this.registerSubmit(registerSubmitFunction)
		}
	};

	var registerFunction = [{
		event: "toProgram",
		func: function() {
			buildInfo.apply(this, arguments);
		}
	}];

	var registerSubmitFunction = [{
		event: "program-bgm",
		func: function(object) {
			submitForm.apply(this, arguments);
		}
	}];


	var buildInfo = function(id) {
		var program = this.programs[id],
			bgm = program.bgm;
		$("#program-tabgm").val(this.utils.formatJSON(bgm));
	}

	var submitForm = function(object) {
		var me = this,
			data = $(object).find("textarea").val();

		try {
			data = JSON.stringify($.parseJSON(data));
		} catch (e) {
			console.log(e);
			$("#modalMsg").find(".modal-body").html("JSON ERROR!<br/><br/>" + e.message);
			$("#modalMsg").modal();
			return false;
		}
		this.programs[this.programIndex].bgm = $.parseJSON(data);
		this.submitPrograms();

		//this.runSql("UPDATE `" + this.tableName + '` SET `data_bgm` = \'' + data.replace("/'/g", "\\\'") + "' WHERE `data_ID` = " + me.program.id);
	}


});