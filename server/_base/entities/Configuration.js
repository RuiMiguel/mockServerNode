var LoggerUtils = require('../../_utils/Logger.js');

var _logger = LoggerUtils.Logger(true);

var _name, _endpoint, _method, _responsePath, _responseFile, _responseType;

function Configuration(options) {
	if(options != undefined) {
		_configure(options);
	}
	else {
		_logger.error("Server configuration can't be created, 'options' parameter is undefined");
	}
}

function _configure(options) {
	_name = options.name;
	_endpoint = _completeEndpoint(options.server.endpoint);
	_method = options.server.method;
	_responsePath = options.name;
	_responseFile = options.server.endpoint;
	_responseType = options.response.type;
}

function _completeEndpoint(serverEndpoint) {
	if((serverEndpoint != undefined) && (!serverEndpoint.startsWith("/"))) serverEndpoint = "/"+serverEndpoint;
	return serverEndpoint;
}

Configuration.prototype = {
	getName: function() {
		return _name;
	},
	getEndpoint: function() {
		return _endpoint;
	},
	getMethod: function() {
		return _method;
	},
	getResponsePath: function() {
		return _responsePath;
	},
	getResponseFile: function() {
		return _responseFile;
	},
	getResponseType: function() {
		return _responseType;
	}
}

exports.validateServerEndpointConfiguration = function(options) {
	var validate = true;
		
	if(options == undefined) {
		_logger.warning("server bad configurated, no 'options' setted");
		validate = false;
	}

	if(options.server == undefined) {
		_logger.warning("server bad configurated, no 'server' field setted");
		validate = false;
	}
	else {
		if(options.server.method == undefined) {
			_logger.warning("server bad configurated, no 'server.method' value setted");
			validate = false;
		}
		if(options.server.endpoint == undefined) {
			_logger.warning("server bad configurated, no 'server.endpoint' value setted");
			validate = false;
		}
	}

	if(options.response == undefined) {
		_logger.warning("server bad configurated, no 'response' field setted");
		validate = false;
	}
	else {
		if(options.response.type == undefined) {
			_logger.warning("server bad configurated, no 'response.type' value setted");
			validate = false;
		}
	}

	return validate;
}

exports.Configuration = function(options) {
	return new Configuration(options);
}