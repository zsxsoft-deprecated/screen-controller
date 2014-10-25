exports.e = function(io, socket) {
	fetchAllData.call(this, io, socket);
}

var fetchAllData = function(io, socket) {

	var replaceTag = /^data_/,
		jsonTag = /^(\{|\[)[\d\D]+?(\}|\])$/,
		self = this;
	
	socket.on('global', function(data){
		if (data.need == "data") {
			self.sql.query("SELECT * FROM `screen_data`", function(err, rows, fields){
				rows.forEach(function(row) {
					for (name in row) {
						if (replaceTag.test(name)) {
							nameReplaced = name.replace(replaceTag, '');
							row[nameReplaced] = row[name];
							// console.log(row[nameReplaced]);
							if (jsonTag.test(row[nameReplaced])) {
								row[nameReplaced] = JSON.parse(row[nameReplaced]);
							}
							delete row[name];
						}
					}
				});
				self.console.success("Data transfered to " + socket.id)
				socket.emit("data", rows);
			});
		}
	});
}
