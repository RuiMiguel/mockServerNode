
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

exports.Configuration = function(options) {
	return new Configuration(options);
}