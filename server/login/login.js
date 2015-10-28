var BaseServer = require('../_base/entities/Server.js');
var LoggerUtils = require('../_utils/Logger.js');

var _server, _configuration;

function _showHelp() {
	var helpMessage = "*** " + _configuration.getName() + ": use " + _configuration.getMethod() + " " + _configuration.getEndpoint();
	helpMessage += "\n body params: 'user' & 'password'";
	return helpMessage;
}

function _createEndpoints() {
	_server.call(_configuration.getEndpoint(), _configuration.getMethod(), _configuration.getResponseType(), function (request) {			  	
	  	var response;
		
		var user = _server.getBodyParam("user");
		var password = _server.getBodyParam("password");

		response = _server.loadResponseFile();	

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
	_server = BaseServer.Server(app, options);
	_configuration = _server.getConfiguration();

	_logger = LoggerUtils.Logger(true);

	if(_server != undefined)
		_createEndpoints();	
	else {
		_logger.error("Server can not be created! please check your configuration");
	}
}

exports.getServerConfiguration = function(){
	return _server.getConfiguration();
}
exports.showHelp = function() {
	return _showHelp();
}