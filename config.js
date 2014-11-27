exports.config = {
	"lang": "en",
	"webServer":{
		"port": 3000,
		"staticFolders": "public",
		"htmlFolders": "views",
		"serverFolders": "routes"
	},
	"extensions": {
		"barrage": {
			"wsUrl": "http://dmserver.duapp.com/"
		}
	}
}
