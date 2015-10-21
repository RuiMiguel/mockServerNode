
function _addHeader(response, key, value) {
	console.log("--- added header: key= "+key+" value= "+value);
	response.setHeader(key, value);
}

exports.addHeader = function(response, key, value) {
	_addHeader(response, key, value);
}

exports.setHeaders = function(response, responseType){
	switch(responseType) {
		case 'JSON':
			_addHeader(response, 'Content-Type', 'application/json');
			break;
		case 'XML':
			_addHeader(response, 'Content-Type', 'application/xml');
			break;
	}
	return response;
}