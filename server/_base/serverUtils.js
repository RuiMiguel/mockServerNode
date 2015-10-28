/*
This software is licensed under the MIT License.

Copyright Fedor Indutny, 2012.
Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var express = require('express');
var compress = require('compression');
var bodyParser = require("body-parser");
var FileSystemUtils = require('../_utils/FileSystem.js');
var LoggerUtils = require('../_utils/Logger.js');

var ip = require("ip");
var _logger = LoggerUtils.Logger(true);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(compress()); 

var availableEndpoints = new Array();

function _getIpAddress() {
	var ipAddress = ip.address();
	return ipAddress;
}

function _printServerHelp() {
	_logger.info("*** Print server help");

	var helpResponse = "";
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			helpResponse += serverEndpoint.showHelp() +"<br/>";
		}
		else {
			_logger.error("Error: server '"+serverEndpoint+"' doesn't have 'showHelp' method. Please create it!");
		}	
	}
		
	return helpResponse;
}

function _showServerHelp() {
	_logger.info("================================================ HELP");
	for(index in availableEndpoints) {
		var serverEndpoint = availableEndpoints[index];

		if(serverEndpoint.showHelp && typeof serverEndpoint.showHelp == 'function') {
			_logger.info(serverEndpoint.showHelp());
			_logger.info("-------------------------------------");
		}
		else {
			_logger.error("Error: server '"+serverEndpoint+"' doesn't have 'showHelp' method. Please create it!");
		}		
	}
	_logger.info("================================================");
}

function _validateServerEndpointConfiguration(options) {
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

function _existsEndpoint(serverName,serverEndpoint) {
	var exists = false;

	for(index in availableEndpoints) {
		var endpoint = availableEndpoints[index];
		endpoint.getServerConfiguration
		if(endpoint.getServerConfiguration && typeof endpoint.getServerConfiguration == 'function') {
			var endpointConfiguration = endpoint.getServerConfiguration();

			if((endpointConfiguration.getName() == serverName) && (endpointConfiguration.getEndpoint() == serverEndpoint)) exists = true;
		}
		else {
			_logger.error("Error: '"+serverName+"' method 'getServerConfiguration' doesn't exists or not exported");
			exists = true;
		}
	}
	return exists;
}

function _createRootEndpoint() {
	//show root help
	app.get('/', function (req, res) {
		var response = _printServerHelp();
		res.send(response);
	})
}

function _createEndpoint(options) {
	var serverName = options.name;
	var serverEndpoint = options.server.endpoint;

	var requestEndpointPath = FileSystemUtils.getRequestEndpointPath(serverName,serverEndpoint);

	if(FileSystemUtils.existsEndpointPath(requestEndpointPath)) {
		var exists = _existsEndpoint(serverName,serverEndpoint);
		if(!exists) {
			var newServerEndpoint = require(requestEndpointPath);
		
			//init requestCall
			newServerEndpoint.init(app, options);
			availableEndpoints.push(newServerEndpoint);
			
			var newServerConfiguration = newServerEndpoint.getServerConfiguration();
			_logger.info("++ request endpoint server '"+newServerConfiguration.getName()+newServerConfiguration.getEndpoint()+"'");
		}
		else {
			_logger.warning("server '"+serverName+serverEndpoint+"' yet exists in available endpoints! please review its configuration");
		}
	}
	else 
		_logger.error("Error: '"+serverName+"' can't be created, '"+requestEndpointPath+"' doesn't exists");
}
 
exports.addServerEndpoint = function(options) {
	if(_validateServerEndpointConfiguration(options)) {
		var serverName = options.name;
		var serverEndpoint = options.server.endpoint;

		_createEndpoint(options);
	}
	else {
		_logger.warning("server bad configurated, not added! please review its configuration");

		var sampleConfiguration = "{'name': SERVER_NAME,'server': {'method': GET/POST/PUT/DELETE,'endpoint': /ENDPOINT},'response': {'type': RESPONSE_TYPE}";
		_logger.info("** "+sampleConfiguration+" **");
	}
}

exports.launchServer = function(serverName) {
	_createRootEndpoint();

	_showServerHelp();

	//launch server
	var server = app.listen(3000, _getIpAddress(), function () {
		var host = server.address().address;
		var port = server.address().port;

		_logger.info("+++++ " + serverName + " server listening at http://"+host+":"+port+" +++++");
	})
}