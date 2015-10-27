var fileSystemUtils = require('./utils/FileSystem.js');

var responseObject = require('./entities/Response.js');
var requestObject = require('./entities/Request.js');

function _completeEndpoint(serverEndpoint) {
	if(!serverEndpoint.startsWith("/")) serverEndpoint = "/"+serverEndpoint;
	return serverEndpoint;
}

function _doGet(app, endpoint, onCallback) {
	app.get(endpoint, onCallback);
}
function _doPost(app, endpoint, onCallback) {
	app.post(endpoint, onCallback);
}
function _doPut(app, endpoint, onCallback) {
	app.put(endpoint, onCallback);
}
function _doDelete(app, endpoint, onCallback) {
	app.delete(endpoint, onCallback);
}

function _showBodyParams(request) {
	requestUtils.showBodyParams(request);
}

function _setHeaders(response, type) {
	responseUtils.setHeaders(response, type);
}

function _printErrorMessage(serverEndpoint, type, code, error, data) {
	var response = responseObject.Response();
	response.setCode(code);
	response.setData(data);
	response.setError(error);

	console.error(error);

	return response.print();
}

exports.getBodyParam = function(request, key) {
	return requestUtils.getBodyParam(request, key);
}

exports.getQueryParam = function(request, key) {
	return requestUtils.getQueryParam(request, key);
}

exports.addHeader = function(response, key, value) {
	responseUtils.addHeader(response, key, value);
}

exports.loadResponseFile = function(path, file, type) {
	var responseData = fileSystemUtils.loadResponseFile(path, file, type);

	var response = responseObject.Response();
	response.setData(responseData); 
	return response;
}

exports.call = function(app, serverEndpoint, method, type, onCallback) {
	serverEndpoint = _completeEndpoint(serverEndpoint);

	switch(method) {
		case 'GET':
			_doGet(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var response= "";
				
				_setHeaders(res, type);

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
			_doPost(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var response = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

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
			_doPut(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var response = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

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
			_doDelete(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var response = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

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
		default:
			_doGet(app, serverEndpoint, function(req, res) {
				console.log("\ndefault method "+serverEndpoint);

				var response = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

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