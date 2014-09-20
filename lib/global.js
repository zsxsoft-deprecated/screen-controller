exports.func = function(self, io, socket)
{
	var data_replace_tag = /^data_/;
	var data_isjson_tag = /^(\{|\[)[\d\D]+?(\}|\])$/;
	
	socket.on('global', function(data){
		if (data.need == "data")
		{
			console.log(data);
			self.sql.query("SELECT * FROM `screen_data`", function(err, rows, fields){
				rows.forEach(function(row){
					//console.log(e);
					for(name in row)
					{
						if (data_replace_tag.test(name))
						{
							_name = name.replace(data_replace_tag, '');
							row[_name] = row[name];
							console.log(row[_name]);
							if (data_isjson_tag.test(row[_name])) row[_name] = JSON.parse(row[_name]);
							delete row[name];
						}
					}
					console.log(row);
				});
				socket.emit("data", rows);
				/*self.create_request(data.screen_id, 0, "get_question", {
					"question": rows,
				});*/
			});
		}
	});
	
			
	var return_all_data = function(data){
		
	}
}