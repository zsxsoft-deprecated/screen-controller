exports.e = function(self, io, socket) {
	fetchAllData(self, io, socket);
}

var fetchAllData = function(self, io, socket) {

	var replaceTag = /^data_/,
		jsonTag = /^(\{|\[)[\d\D]+?(\}|\])$/;
	
	socket.on('global', function(data){
		if (data.need == "data") {
			console.log(data);
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
				socket.emit("data", rows);
			});
		}
	});
}
