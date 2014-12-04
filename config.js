exports.config = {
	"lang": "en",
	"webServer":{
		"port": 3000,
		"staticFolders": "core/public",
		"htmlFolders": "core/views",
		"serverFolders": "core/routes"
	},
	"extensions": {
		"barrage": {
			"wsUrl": "http://dmserver.duapp.com/"
		}
	}
}
