var bodyParser = require("body-parser");

function _showListElements(list) {
	for(elem in list) {
		console.log(elem+": "+list[elem]);
  	}
}

exports.getBodyParam = function(request, key) {
	var value;
	for(elem in request.body) {
		if(elem == key) value = request.body[elem];
  	}  	
  	return value;
}

exports.getQueryParam = function(request, key) {
	var value;
	for(elem in request.query) {
		if(elem == key) value = request.query[elem];
  	}
  	return value;
}

exports.showBodyParams = function(request) {
	console.log("--- body params");
	_showListElements(request.body);
}

exports.showQueryParams = function(request) {
	console.log("--- query params");
	_showListElements(request.query);
}