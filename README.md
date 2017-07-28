# a random token to store in redis

get a random token to store  in redis. this module can be used for:

- save session or api middleware data
- get a token for use  verification
- Save flash messages

## Install

```
$ npm install --save redis-token
```

## Usage

```javascript
var RedisToken = require('redistoken');

// Create a data store
var dataStore = new RedisToken({
	prefix: 'mydata'
});

// Set a key
dataStore.set('data', function(err, token) {
	if (err) {
		return console.log(err);
	}

	// Give the token to whoever is going to 
	// fetch this data in the future, usually either 
	// as a browser cookie or in the response body 
	// for an api.
	
});

// Get the data
dataStore.get(token, function(err, data) {
	if (err) {
		return console.log(err);
	}

	console.log(data); // 'data'
});
```

## Options

All options below are showing their default values.

```javascript
var dataStore = new RedisToken({
	redisPort: undefined, // The redis server port
	redisHost: undefined, // The redis server host
	redisOpts: {}, // The redis server connection options
	prefix: '', // Key prefix
	expires: 60, // Key expiration
	onReady: noop, // Redis connection events
	onConnect: noop,
	onError: noop,
	strongKey: false, // Should it generate a cryptographically secure key
	len: 16, // The length of the generated token
	singleUse: true, // Delete the key after successful get
	stringifyData: true, // JSON stringify the data before saving, parse on get
});
```

## Tests

```
$ npm test
$ REDIS_HOST="192.168.59.103" REDIS_PORT="6370" mocha
```

The test are run with mocha and use a docker container to run redis.  On my machine I run docker in `boot2Docker`, which starts on `192.168.59.103`.  You can see this IP in the package.json, edit this to suite your environment.  To run these tests you will need to setup `boot2docker` and run `npm run docker-redis-pull` once before getting started.  Optionally you can just run mocha directly with the second command above.
