# mockServerNode
mock server implemented in NodeJs to develop mobile apps with server requests

many times when we develop mobile apps with back-end server side, we always have to wait for them to start implement our requests or while testing other developers could change CMS status and disturb ourselves. With a local mock server we could simulate back-end and change fake responses "in hot"

##create new end point
into app.js in root, add server endpoint by JSON configuration:

var serverUtils = require('./server/base/serverUtils.js')
serverUtils.addServerEndpoint(configuration);

there are 2 differents kind of endpoints:
* standard: use default base/server.js, just configure response.
```
serverUtils.addServerEndpoint({
	"name": ENDPOINT_NAME,
	"method": GET/POST/PUT/DELETE,
	"response": {
		"file": RESPONSE_FILE,
		"path": RESPONSE_PATH,
		"type": RESPONSE_TYPE
	}
});
```
* custom: configure endpoint .js and response too.
```
serverUtils.addServerEndpoint({
	"name": ENDPOINT_NAME,
	"server": {
		"file": ENDPOINT_FILE,
		"path": ENDPOINT_PATH,
		"endpoint": ENDPOINT
	},
	"method": GET/POST/PUT/DELETE,
	"response": {
		"file": RESPONSE_FILE,
		"path": RESPONSE_PATH,
		"type": RESPONSE_TYPE
	}
});
```

##create response file 
when added server endpoint, response configuration is setted:
```
"response": {
	"file": RESPONSE_FILE,
	"path": RESPONSE_PATH,
	"type": RESPONSE_TYPE
}
````

Add response file to indicated path


Please put custom endpoints and related responses into same directory.
