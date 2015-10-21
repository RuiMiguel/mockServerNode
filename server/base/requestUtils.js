var bodyParser = require("body-parser");


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
	for(elem in request.body) {
		console.log(elem+": "+request.body[elem]);
  	}
}

exports.showQueryParams = function(request) {
	console.log("--- query params");
	for(elem in request.query) {
		console.log(elem+": "+request.query[elem]);
  	}
}