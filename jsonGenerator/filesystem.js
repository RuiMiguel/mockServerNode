var fs = require('fs');

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
				fs.unlinkSync(curPath);
			}
		}
    );

	console.log("--- Successfully deleted all files from '"+filesPath+"'");
}