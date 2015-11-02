var serverName = "Demo";
var serverUtils = require('./server/_base/serverUtils.js')

//declare all request calls to mockserver here
addServerEndpoints();
serverUtils.launchServer(serverName);

function addServerEndpoints() {
	//do login
	serverUtils.addServerEndpoint({
		"name": "login",
		"server": {
			"method": "POST",	
			"endpoint": "login"
		},
		"response": {
			"type": "JSON"
		}
	});
/*
	//database version
	serverUtils.addServerEndpoint({
		"name": "dbVersion",
		"server": {
			"method": "POST",
			"endpoint": "dbVersion"
		},		
		"response": {
			"type": "JSON"
		}
	});

	//check session valid
	serverUtils.addServerEndpoint({
		"name": "session",
		"server": {
			"method": "POST",	
			"endpoint": "checkSession"
		},
		"response": {
			"type": "JSON"
		}
	});


	//update headquarters
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"method": "POST",	
			"endpoint": "updateHeadquarters"
		},
		"response": {
			"type": "JSON"
		}
	});
	
	//update employees
	serverUtils.addServerEndpoint({
		"name": "update",
		"server": {
			"method": "POST",
			"endpoint": "updateEmployees"
		},		
		"response": {
			"type": "JSON"
		}
	});
*/
}