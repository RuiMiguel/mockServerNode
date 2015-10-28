var BaseServer = require('../_base/entities/Server.js');
var LoggerUtils = require('../_utils/Logger.js');

var _server, _configuration;

function _showHelp() {
	var helpMessage = "*** " + _configuration.getName() + ": use " + _configuration.getMethod() + " " + _configuration.getEndpoint();
	helpMessage += "\n body params: 'token'";
	return helpMessage;
}

function _createEndpoints() {
	_server.call(_configuration.getEndpoint(), _configuration.getMethod(), _configuration.getResponseType(), function (request) {			  	
	  	var response;
		
		var token = _server.getBodyParam("token");

		if(token !== undefined) {
			response = _server.loadResponseFile();	
		}
		else {
			response = {
				"code": 1,
				"error": "'token' is empty"
			};
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