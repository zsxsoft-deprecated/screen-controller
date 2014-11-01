define(function(require, exports, module) {
	
	module.exports = {
		init: function() {
			this.register(registerFunction);
		}
	};

	var registerFunction = [
		{
			event: "runSql",
			func: function() {
				runSql.apply(this, arguments);		
			}
		}
	];

	var runSql = function(sql) {
		console.log(sql);
		$('#modalMsg').find(".modal-body").html("SQL Running.....");
		$('#modalMsg').modal();
		this.sendRequest({
			method: "runsql", 
			data: sql
		}, function() {
			$('#modalMsg').modal('hide');
		});
	}


});