exports.e = function(io, socket) {
	var self = this;
	self.console.info(this.lang.console.clientConnected.replace("%c%", this.lang.global.editor).replace("%d%", socket.id));
	socket.join('editor');
	socket.on('editor', function(data) {
		self.createRequest("editor", socket.id, data.id, data.data, function(data) {
			self.console.success(self.lang.console.runSql.replace("%s%", data.data.data));
			var query = function(data, send) {
				self.sql.query(data.data.data, function(err, rows, fields) {
				
					/*if (err != null && send) {
						self.sql.query("ALTER TABLE `" + self.config.tables.data.name + "` DROP PRIMARY KEY;", function(err) {

						});
						return query(data, false);
					}*/

					data.data = err;
					self.console.success(self.lang.console.sqlError.replace("%s%", err));
					delete self.queue.queue[data.id];
					io.sockets.to(data.requestId).emit('result', data);
					self.console.success(self.lang.console.requestFinish.replace("%d%", data.id));

				});
			}
			query(data, true);

		});	
	});
}