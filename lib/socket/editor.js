exports.e = function(io, socket) {
	var self = this;
	self.console.info('EDITOR (' + socket.id + ') connected!');
	socket.join('editor');
	socket.on('editor', function(data) {
		self.createRequest("editor", socket.id, data.id, data.data, function(data) {
			console.info("Run SQL: " + data.data.data);
			var query = function(data, send) {
				self.sql.query(data.data.data, function(err, rows, fields) {
				
					/*if (err != null && send) {
						self.sql.query("ALTER TABLE `" + self.config.tables.data.name + "` DROP PRIMARY KEY;", function(err) {

						});
						return query(data, false);
					}*/

					data.data = err;
					console.success("SQL Running Error: " + err);
					delete self.queue.queue[data.id];
					io.sockets.to(data.requestId).emit('result', data);
					self.console.success('Request (' + data.id + ') finished.');

				});
			}
			query(data, true);

		});	
	});
}