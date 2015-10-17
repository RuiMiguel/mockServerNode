var express = require('express')
var bodyParser = require("body-parser");
var app = express()

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json()); // to support JSON-encoded bodies

var serverName = "Demo";
var utils = require('./server/utils.js')

//declare all request calls to mockserver here
addServerRequestCalls();
launchServer();

function addServerRequestCalls() {
	utils.addServerRequestCall({
		"name" : "login",
		"file" : "login",
		"path" : "login",
		"method" : "POST"
	}, app);
	utils.addServerRequestCall({
		"name" : "update",
		"file" : "update",
		"path" : "update",
		"method" : "POST"
	}, app);
}

function addRootRequestCall() {
	//show root help
	app.get('/', function (req, res) {
		var response = utils.printServerHelp();
		res.send(response);
	})
}

function launchServer() {
	addRootRequestCall();

	//launch server
	var server = app.listen(3000, function () {
		var host = server.address().address
		var port = server.address().port

		console.log(serverName + " server listening at http://%s:%s", host, port)
	})
}