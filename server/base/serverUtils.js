var express = require('express');
var bodyParser = require("body-parser");
var fileSystemUtils = require('../filesystem.js');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json()); // to support JSON-encoded bodies

var availableEndpoints = new Array();

function _printServerHelp() {
	console.log("*** Print server help");

	var helpResponse = "";
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			helpResponse += serverEndpoint.showHelp() +"<br/>";
		}
	}
		
	return helpResponse;
}

function _showServerHelp() {
	console.log("\n===================================== HELP");
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			console.log(serverEndpoint.showHelp());
			console.log("-------------------------------------");
		}
		else {
			console.error("Error: server '%s' doesn't have 'showHelp' method. Please create it!", serverEndpoint);
		}		
	}
	console.log("=====================================");
}

function _createRootEndpoint() {
	//show root help
	app.get('/', function (req, res) {
		var response = _printServerHelp();
		res.send(response);
	})
}

function _createStandardEndpoint(options) {
	options.server = {
		"file" : "server",
		"path" : "base",
		"endpoint" : options.name
	};
	_createEndpoint(options);
}

function _createCustomEndpoint(options) {
	_createEndpoint(options);
}

function _createEndpoint(options) {
	var serverName = options.name;
	var server = options.server;

	var requestEndpointPath = fileSystemUtils.getRequestEndpointPath(server.path,server.file);

	if(fileSystemUtils.existsEndpointPath(requestEndpointPath)) {
		var serverEndpoint = require(requestEndpointPath);
		
		//init requestCall
		serverEndpoint.init(app, options);
		availableEndpoints.push(serverEndpoint);
	}
	else 
		console.error("Error: '%s' can't be created, '%s' don't exists", serverName, requestEndpointPath);
}


exports.launchServer = function(serverName) {
	_createRootEndpoint();

	_showServerHelp();

	//launch server
	var server = app.listen(3000, 'localhost', function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log("\n+++++ " + serverName + " server listening at http://%s:%s +++++\n", host, port);
	})
}

exports.addServerEndpoint = function(options) {
	var serverName = options.name;
	var server = options.server;
	if(server == null) {
		console.log("\n--- standard request endpoint server '%s' ---", serverName);
		_createStandardEndpoint(options);
	}
	else {
		var serverEndpoint = options.server.endpoint;
		console.log("--- custom request endpoint server '%s/%s' ---", serverName, serverEndpoint);
		_createCustomEndpoint(options);
	}
}