var fs = require("fs");
var path = require('path');

var availableRequestCalls = new Array();

exports.addServerRequestCall = function(options, app) {
	var file = "./"+options.path+"/"+options.file+".js"
	var requestCallPath = path.join(__dirname, file);

	if(fs.existsSync(requestCallPath)) {
		var serverRequestCall = require(requestCallPath);
		console.log("Request call server '%s' created!", options.name);

		//init requestCall
		serverRequestCall.init(app);

		availableRequestCalls.push(serverRequestCall);
	}
	else 
		console.error("Error: '%s' can't be created, '%s' don't exists", options.name, requestCallPath);
}

exports.printServerHelp = function() {
	var helpResponse = "";
	for(index in availableRequestCalls) {
		var serverRequestCall = availableRequestCalls[index];
		helpResponse += this.printMessage(serverRequestCall.showHelp());
	}
	return helpResponse;
}

exports.printMessage = function(msg) {
	return msg +"<br/>";	
}

exports.loadResponseFile = function(file) {
	var response = "";
	var filePath = path.join(__dirname, file);

	try {
		if(fs.existsSync(filePath)) {
			response = fs.readFileSync(filePath);
			if(response == "")
				console.warn("File '%s' is empty", filePath);
		}
		else 
			console.error("Error: file '%s' don't exists", filePath);
	}
	catch(err) {
		console.error("Error in fileSystem");
	}
	return response;
}