var FileSystemUtils = require('../../_utils/FileSystem.js');
var LoggerUtils = require('../../_utils/Logger.js');
var ConfigurationObject = require('./Configuration.js');
var ResponseObject = require('./Response.js');
var RequestObject = require('./Request.js');

var _app;
var _response;
var _request;
var _configuration;

var _logger = LoggerUtils.Logger(true);

//constructor
function Server(app, options) {
	if(app != undefined) {
		_app = app;
	}
	else {
		_logger.error("Server can't be created, 'app' parameter is undefined");
	}

	_configuration = ConfigurationObject.Configuration(options);
}

function _doGet(endpoint, onCallback) {
	if(_app != undefined) {
		_app.get(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doGet' from 'app' undefined");
	}
}
function _doPost(endpoint, onCallback) {
	if(_app != undefined) {
		_app.post(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doPost' from 'app' undefined");
	}
}
function _doPut(endpoint, onCallback) {
	if(_app != undefined) {
		_app.put(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doPut' from 'app' undefined");
	}
}
function _doDelete(endpoint, onCallback) {
	if(_app != undefined) {
		_app.delete(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doDelete' from 'app' undefined");
	}
}

function _showBodyParams() {
	if(_request != undefined) {
		_request.showAllBodyParams();
	}
	else {
		_logger.error("can not call '_showBodyParams' from 'request' undefined");
	}
}

function _showQueryParams() {
	if(_request != undefined) {
		_request.showAllQueryParams();
	}
	else {
		_logger.error("can not call '_showQueryParams' from 'request' undefined");
	}
}

function _setHeaders(type) {
	if(_response != undefined) {
		_response.setHeaders(type);
	}
	else {
		_logger.error("can not call '_setHeaders' from 'response' undefined");
	}
}

function _printErrorMessage(serverEndpoint, type, code, error, data) {
	_response.setCode(code);
	_response.setData(data);
	_response.setError(error);

	return _response.print();
}

function _getResponse(){
	return _response;
}
function _setResponse(response){
	_response = ResponseObject.Response(response);
}
function _getRequest() {
	return _request;
}
function _setRequest(request) {
	_request = RequestObject.Request(request);
}

//class methods
Server.prototype = {
	errorCodes: ["0","500"],
	errorMessages: [
		"NO ERROR",
		"SERVER ERROR"
		],

	getConfiguration: function() {
		return _configuration;
	},

	getBodyParam: function(key) {
		var paramValue = "";

		if(_request != undefined) {
			paramValue = _request.getBodyParam(key);
		}
		else {
			_logger.error("can not call 'getBodyParam' from 'request' undefined");
		}

		return paramValue;
	},
	getQueryParam: function(key) {
		var paramValue = "";

		if(_request != undefined) {
			paramValue = _request.getQueryParam(key);
		}
		else {
			_logger.error("can not call 'getQueryParam' from 'request' undefined");
		}

		return paramValue;
	},
	addHeader: function(key, value) {
		if(_response != undefined) {
			_response.addHeader(key, value);
		}
		else {
			_logger.error("can not call 'addHeader' from 'response' undefined");
		}
	},

	loadResponseFile: function() {
		var response = "";

		if(_response != undefined) {
			if(_configuration != undefined){
				var path = _configuration.getResponsePath();
				var file = _configuration.getResponseFile();
				var type = _configuration.getResponseType();

				var responseData = FileSystemUtils.loadResponseFile(path, file, type);
				_response.setData(responseData); 
				response = _response.print();
			}
			else {
				_logger.error("can not call 'loadResponseFile' from 'configuration' undefined");
			}
		}
		else {
			_logger.error("can not call 'loadResponseFile' from 'response' undefined");
		}
		
		return response;
	},

	call: function(endpoint, method, type, onCallback) {
		switch(method) {
			case 'GET':
			default:
				_doGet(endpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+endpoint);

					var response= "";
					
					_showQueryParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						responseData = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'POST':
				_doPost(endpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+endpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'PUT':
				_doPut(endpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+endpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'DELETE':
				_doDelete(endpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+endpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
		}
	}
}

exports.Server = function(app, options) {
	return new Server(app, options);
}