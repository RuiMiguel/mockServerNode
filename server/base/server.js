var fileSystemUtils = require('../filesystem.js');
var responseUtils = require('./responseUtils.js');
var requestUtils = require('../base/requestUtils.js');

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

exports.getBodyParam = function(request, key) {
	return requestUtils.getBodyParam(request, key);
}

exports.addHeader = function(response, key, value) {
	responseUtils.addHeader(response, key, value);
}

exports.loadResponseFile = function(path, file, type) {
	return fileSystemUtils.loadResponseFile(path, file, type);
}

exports.call = function(app, serverEndpoint, method, type, onCallback) {
	serverEndpoint = _completeEndpoint(serverEndpoint);

	switch(method) {
		case 'GET':
			_doGet(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var responseData = "";
				
				_setHeaders(res, type);

				if(onCallback && typeof onCallback == 'function') {
					responseData = onCallback(req);
				}
				else {
					console.error("Error: endpoint '%s' doesn't have onCallback method", serverEndpoint);
				}

				res.send(responseData);
			});
			break;
		case 'POST':
			_doPost(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var responseData = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

				if(onCallback && typeof onCallback == 'function') {
					responseData = onCallback(req);
				}
				else {
					console.error("Error: endpoint '%s' doesn't have onCallback method", serverEndpoint);
				}

				res.send(responseData);
			});
			break;
		case 'PUT':
			_doPut(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var responseData = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

				if(onCallback && typeof onCallback == 'function') {
					responseData = onCallback(req);
				}
				else {
					console.error("Error: endpoint '%s' doesn't have onCallback method", serverEndpoint);
				}

				res.send(responseData);
			});
			break;
		case 'DELETE':
			_doDelete(app, serverEndpoint, function(req, res) {
				console.log("\n"+method+" "+serverEndpoint);

				var responseData = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

				if(onCallback && typeof onCallback == 'function') {
					responseData = onCallback(req);
				}
				else {
					console.error("Error: endpoint '%s' doesn't have onCallback method", serverEndpoint);
				}

				res.send(responseData);
			});
			break;
		default:
			_doGet(app, serverEndpoint, function(req, res) {
				console.log("\ndefault method "+serverEndpoint);

				var responseData = "";
				
				_showBodyParams(req);
				_setHeaders(res, type);

				if(onCallback && typeof onCallback == 'function') {
					responseData = onCallback(req);

				}
				else {
					console.error("Error: endpoint '%s' doesn't have onCallback method", serverEndpoint);
				}

				res.send(responseData);
			});
			break;
	}
}