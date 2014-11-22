exports.config = {
	"lang": "en",
	"mysql"	: {
		"host": "localhost",
		"post": "3306",
		"user": "root",
		"password": "123456",
		"database": "screen_fuck",
	},
	"tables":{
		"data": {
			"name": "screen_data",
			"fields": ["id", "sort", "player", "player_name", "player_class", "bgm", "program", "program_name", "score", "display"]
		}
	},
	"webServer":{
		"port": 3000,
		"staticFolders": "public",
		"htmlFolders": "views",
		"serverFolders": "routes"
	},
	"extensions": {
		"barrage": {
			"wsUrl": "http://127.0.0.1:4000/"
		}
	}
}
