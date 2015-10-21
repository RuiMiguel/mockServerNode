var fs = require('fs');
var path = require('path');

exports.saveJson2File = function(json, filePath) {
	fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
	console.log("+++ File was saved into '"+filePath+"'");
}
exports.cleanJSON = function(filesPath) {
	console.log("clear old JSON files");

	fs.readdirSync(filesPath).forEach(
		function(file,index){
			var curPath = filesPath + "/" + file;
			if(!fs.lstatSync(curPath).isDirectory()) { 
				if(path.extname(file).toUpperCase() == "JSON")
					fs.unlinkSync(curPath);
			}
		}
    );

	console.log("--- Successfully deleted all JSON files from '"+filesPath+"'");
}