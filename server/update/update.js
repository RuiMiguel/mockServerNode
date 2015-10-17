var fs = require("../utils.js");

var helpMessage = "*** Update: use POST /update";

function help() {
	return helpMessage;
}

function printParams(list) {
	for(elem in list) {
		console.log(elem+": "+list[elem]);
  	}
}

exports.init = function(app) {
	help();

	app.post('/update', function (req, res) {
		console.log('POST /update');

	  	printParams(req.body);

		var response = fs.loadResponseFile("update/update.json");

    	res.setHeader('Content-Type', 'application/json');
		res.send(response);
	});
}

exports.showHelp = function() {	
	var msg = help();
	return msg;
}