var FileSystemUtils = require('../../_utils/FileSystem.js');
var LoggerUtils = require('../../_utils/Logger.js');
var ConfigurationObject = require('./Configuration.js');
var ResponseObject = require('./Response.js');
var RequestObject = require('./Request.js');

var _logger = LoggerUtils.Logger(true);

//constructor
function Server(app, configuration) {
	if(app != undefined) {
		this._app = app;
	}
	else {
		_logger.error("Server can't be created, 'app' parameter is undefined");
	}

	if(configuration != undefined) {
		this._configuration = configuration;
	}
	else {
		_logger.error("Server configuration can't be created, 'configuration' parameter is undefined");
	}
}

function _doGet(endpoint, onCallback) {
	if(this._app != undefined) {
		this._app.get(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doGet' from 'app' undefined");
	}
}
function _doPost(endpoint, onCallback) {
	if(this._app != undefined) {
		this._app.post(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doPost' from 'app' undefined");
	}
}
function _doPut(endpoint, onCallback) {
	if(this._app != undefined) {
		this._app.put(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doPut' from 'app' undefined");
	}
}
function _doDelete(endpoint, onCallback) {
	if(this._app != undefined) {
		this._app.delete(endpoint, onCallback);
	}
	else {
		_logger.error("can not call '_doDelete' from 'app' undefined");
	}
}

function _showBodyParams() {
	if(this._request != undefined) {
		this._request.showAllBodyParams();
	}
	else {
		_logger.error("can not call '_showBodyParams' from 'request' undefined");
	}
}

function _showQueryParams() {
	if(this._request != undefined) {
		this._request.showAllQueryParams();
	}
	else {
		_logger.error("can not call '_showQueryParams' from 'request' undefined");
	}
}

function _setHeaders(type) {
	if(this._response != undefined) {
		this._response.setHeaders(type);
	}
	else {
		_logger.error("can not call '_setHeaders' from 'response' undefined");
	}
}

function _printErrorMessage(serverEndpoint, type, code, error, data) {
	this._response.setCode(code);
	this._response.setData(data);
	this._response.setError(error);

	return this._response.print();
}

function _getResponse(){
	return this._response;
}
function _setResponse(response){
	this._response = ResponseObject.Response(response);
/*
	var path = this._configuration.getResponsePath();
	var file = this._configuration.getResponseFile();
	var type = this._configuration.getResponseType();

	this._response.setPath(path);
	this._response.setFile(file);
	this._response.setType(type);
	*/
}
function _getRequest() {
	return this._request;
}
function _setRequest(request) {
	this._request = RequestObject.Request(request);
}

//class methods
Server.prototype = {
	getConfiguration: function() {
		return this._configuration;
	},
	getRequest: function() {
		return _getRequest.call(this);
	},
	getResponse: function() {
		return _getResponse.call(this);
	},
	getBodyParam: function(key) {
		var paramValue = "";

		if(this._request != undefined) {
			paramValue = this._request.getBodyParam(key);
		}
		else {
			_logger.error("can not call 'getBodyParam' from 'request' undefined");
		}

		return paramValue;
	},
	getQueryParam: function(key) {
		var paramValue = "";

		if(this._request != undefined) {
			paramValue = this._request.getQueryParam(key);
		}
		else {
			_logger.error("can not call 'getQueryParam' from 'request' undefined");
		}

		return paramValue;
	},
	addHeader: function(key, value) {
		if(this._response != undefined) {
			this._response.addHeader(key, value);
		}
		else {
			_logger.error("can not call 'addHeader' from 'response' undefined");
		}
	},

	loadResponseFile: function() {
		var response = "";

		if(this._response != undefined) {
			if(this._configuration != undefined){
				var path = this._configuration.getResponsePath();
				var file = this._configuration.getResponseFile();
				var type = this._configuration.getResponseType();

				var responseData = FileSystemUtils.loadResponseFile(path, file, type);
				this._response.setData(responseData); 
				response = this._response.print();
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

	launchCall: function(endpoint, method, type, onCallback) {
		switch(method) {
			case 'GET':
			default:
				_doGet.call(this, endpoint, function(req, res) {
					_setRequest.call(this, req);
					_setResponse.call(this, res);

					_logger.log(method+" "+endpoint);

					var response= "";
					
					_showQueryParams.call(this);
					_setHeaders.call(this, type);

					if(onCallback && typeof onCallback == 'function') {
						responseData = onCallback(_getRequest.call(this), _getResponse.call(this));
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage.call(this, endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'POST':
				_doPost.call(this, endpoint, function(req, res) {

					_logger.log("Server _doPost: "+req);

					_setRequest.call(this, req);
					_setResponse.call(this, res);

					_logger.log(method+" "+endpoint);

					var response = "";
					
					_showBodyParams.call(this);
					_setHeaders.call(this, type);

					if(onCallback && typeof onCallback == 'function') {
						responseData = onCallback(this);
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage.call(this, endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'PUT':
				_doPut.call(this, endpoint, function(req, res) {
					_setRequest.call(this, req);
					_setResponse.call(this, res);

					_logger.log(method+" "+endpoint);

					var response = "";
					
					_showBodyParams.call(this);
					_setHeaders.call(this, type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(_getRequest.call(this), _getResponse.call(this));
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage.call(this, endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
			case 'DELETE':
				_doDelete.call(this, endpoint, function(req, res) {
					_setRequest.call(this, req);
					_setResponse.call(this, res);

					_logger.log(method+" "+endpoint);

					var response = "";
					
					_showBodyParams.call(this);
					_setHeaders.call(this, type);

					if(onCallback && typeof onCallback == 'function') {
						response = onCallback(_getRequest.call(this), _getResponse.call(this));
					}
					else {
						var data = null;
						var code = "500";
						var msg = "Error: endpoint '"+endpoint+"' doesn't have onCallback method";

						response = _printErrorMessage.call(this, endpoint, type, code, msg, data);
					}

					res.send(response);
				});
				break;
		}
	}
}

exports.Server = function(app, configuration) {
	return new Server(app, configuration);
}