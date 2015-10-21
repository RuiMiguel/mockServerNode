var serverName = "Demo";
var serverUtils = require('./server/base/serverUtils.js')

//declare all request calls to mockserver here
addServerEndpoints();
serverUtils.launchServer(serverName);

function addServerEndpoints() {
	//database version
	serverUtils.addServerEndpoint({
		"name": "version",
		"server": {
			"path": "dbVersion",
			"file": "dbVersion",
			"endpoint": "dbVersion"
		},
		"method": "POST",
		"response": {
			"file": "dbVersion",
			"path": "dbVersion",
			"type": "JSON"
		}
	});

	//do login
	serverUtils.addServerEndpoint({
		"name": "login",
		"server": {
			"path": "login",
			"file": "login",
			"endpoint": "login"
		},
		"method": "POST",
		"response": {
			"file": "login",
			"path": "login",
			"type": "JSON"
		}
	});

	//update headquarters
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"path": "update",
			"file": "updateHeadquarters",
			"endpoint": "updateHeadquarters"
		},
		"method": "POST",
		"response": {
			"path": "update",
			"file": "updateHeadquarters",
			"type": "JSON"
		}
	});
	
	//update employees
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"path": "update",
			"file": "updateEmployees",
			"endpoint": "updateEmployees"
		},
		"method": "POST",
		"response": {
			"path": "update",
			"file": "updateEmployees",
			"type": "JSON"
		}
	});
}