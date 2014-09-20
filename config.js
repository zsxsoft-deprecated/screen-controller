exports.config = {
	"mysql"	: {
		"host": "localhost",
		"post": "3306",
		"user": "root",
		"password": "123456",
		"database": "screen_xgywyhy",
	},
	"tables":{
		"data": {
			"name": "screen_data",
			"fields": ["id", "player", "player_name", "player_class", "bgm", "program", "program_name", "score", "display"]
		}
	},
	"webserver":{
		"port": 3000,
		"static_folders": "public",
		"html_folders": "views",
		"server_folders": "routes"
	}
}
