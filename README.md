# mockServerNode
mock server implemented in NodeJs to develop mobile apps with server requests

many times when we develop mobile apps with back-end server side, we always have to wait for them to start implement our requests or while testing other developers could change CMS status and disturb ourselves. With a local mock server we could simulate back-end and change fake responses "in hot"

##create new end point
into app.js in root, add server endpoint by JSON configuration:

var serverUtils = require('./server/base/serverUtils.js')
serverUtils.addServerEndpoint(configuration);

####configure json:
```
	serverUtils.addServerEndpoint({
		"name": SERVER_NAME,
		"server": {
			"method": GET/POST/PUT/DELETE,
			"endpoint": /ENDPOINT
		},		
		"response": {
			"type": RESPONSE_TYPE
		}
	});
```

* SERVER_NAME will be your server path and name
* ENDPOINT is the '/' char followed by the name of the endpoint of your server. It will be your response file name too.

Add response file to indicated path 'SERVER_NAME/ENDPOINT.extension'

####create endpoint services .js

TO-DO


Please put custom endpoints and related responses into same directory.
