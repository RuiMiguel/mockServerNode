var fileSystemUtils = require('../utils/FileSystem.js');
var loggerUtils = require('../utils/Logger.js');
var responseObject = require('./Response.js');
var requestObject = require('./Request.js');

var _app;
var _response;
var _request;
var _logger;

//constructor
function Server(app) {
	_logger = loggerUtils.Logger(true);

	if(app != undefined) {
		_app = app;
	}
	else {
		_logger.error("Server can't be created, 'app' parameter is undefined");
	}
}

function _completeEndpoint(serverEndpoint) {
	if((serverEndpoint != undefined) && (!serverEndpoint.startsWith("/"))) serverEndpoint = "/"+serverEndpoint;
	return serverEndpoint;
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
	_response = responseObject.Response();
	response.setCode(code);
	response.setData(data);
	response.setError(error);

	console.error(error);

	return response.print();
}

function _getResponse(){
	return _response;
}
function _setResponse(response){
	_response = responseObject.Response(response);
}
function _getRequest() {
	return _request;
}
function _setRequest(request) {
	_request = requestObject.Request(request);
}

//class methods
Server.prototype = {
	errorCodes: ["0","500"],
	errorMessages: [
		"NO ERROR",
		"SERVER ERROR"
		],

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

	loadResponseFile: function(path, file, type) {
		var response = "";

		if(_response != undefined) {
			var responseData = fileSystemUtils.loadResponseFile(path, file, type);
			_response.setData(responseData); 
			response = _response.print();
		}
		else {
			_logger.error("can not call 'loadResponseFile' from 'response' undefined");
		}
		
		return response;
	},

	call: function(serverEndpoint, method, type, onCallback) {
		serverEndpoint = _completeEndpoint(serverEndpoint);

		switch(method) {
			case 'GET':
			default:
				_doGet(serverEndpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+serverEndpoint);

					var response= "";
					
					_showQueryParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						responseData = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+serverEndpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(serverEndpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'POST':
				_doPost(serverEndpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+serverEndpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+serverEndpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(serverEndpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'PUT':
				_doPut(serverEndpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+serverEndpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+serverEndpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(serverEndpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'DELETE':
				_doDelete(serverEndpoint, function(req, res) {
					_setRequest(req);
					_setResponse(res);

					_logger.log("\n"+method+" "+serverEndpoint);

					var response = "";
					
					_showBodyParams();
					_setHeaders(type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(req);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+serverEndpoint+"' doesn't have onCallback method";

						response = _printErrorMessage(serverEndpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
		}
	}
}

exports.Server = function(app) {
	return new Server(app);
}