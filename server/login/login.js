var baseServer = require('../base/entities/Server.js');
var loggerUtils = require('../base/utils/Logger.js');

var _server;

function _showHelp() {
	var helpMessage = "*** " + name + ": use " + method + " " + serverEndpoint;
	helpMessage += "\n body params: 'user' & 'password'";
	return helpMessage;
}

function _createEndpoints() {
	_server.call(serverEndpoint, method, responseType, function (request) {			  	
	  	var response;
		
		var user = _server.getBodyParam("user");
		var password = _server.getBodyParam("password");

		_logger.log("responsePath: "+responsePath);
		_logger.log("responseFile: "+responseFile);
		_logger.log("responseType: "+responseType);
		response = _server.loadResponseFile(responsePath, responseFile, responseType);	

		if((user == undefined) || (password == undefined)) {
			response.code = "1";
			response.error = "bad POST body parameters";

			if(user == undefined) 
				response.data = { "message": "'user' empty"};
			if(password == undefined) 
				response.data = { "message": "'password' empty"};
		}

	  	return response;
	});
}

exports.init = function(app, options) {
	_server = baseServer.Server(app);
	_logger = loggerUtils.Logger(true);

	name = options.name;
	serverPath = options.name;
	serverFile = options.server.endpoint;
	serverEndpoint = options.server.endpoint;
	method = options.server.method;
	responsePath = options.name;
	responseFile = options.server.endpoint;
	responseType = options.response.type;

	if(_server != undefined)
		_createEndpoints();	
	else {
		_logger.error("Server can not be created! please check your configuration");
	}
}

exports.showHelp = function() {
	return _showHelp();
}