# a random token to store in redis

get a random token to store  in redis. this module can be used for:

- use promise
- save session or api middleware data
- get a token for use  verification
- Save flash messages

## Install

```
$ npm install --save redis-token
```

## Usage

```javascript
var token = require('redis-token')

var options = { host: '127.0.0.1', port: '6379', password: '' }
// if you options is { host: '127.0.0.1', port: '6379', password: '' } 
// you can write like is  'var redisToken = token.redisToken();'
var redisToken = token.redisToken(options);

redisToken.createToken('wjs',1000).then((key) => {
    console.log(key) // { token: 'qWWPJPHWngnjwjfHLuxQdCjqr4CVE9e0J51QIxSjfQmmbXl4DmwrT4PZj5nb72wj',success: true }
})

redisToken.getToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value)=>{
    console.log(value) // { tokenValue: 'wjs', success: true }
})

redisToken.killToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value) => {
    console.log(value) // { kill: [ 1 ], success: true }
})
```

## Options

All options below are showing their default values.

```javascript

var options = { 
    host: '127.0.0.1', // the redis server host, default is '127.0.0.1'
    port: '6379',  // the redis server port, default is '6379'
    password: '', // the redis password, default is ''
  }

```
