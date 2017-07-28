# a random token to store in redis (使用 redis 存储随机的 token)

get a random token to store  in redis. this module can be used for: （随机获取一个令牌存储在redis中，以下情况可以使用）

- use promise （希望使用promise）
- save session or cookie data (需要存储session和cookie数据缓存在redis中)
- get a token for use  verification （获取一个令牌给用户验证）

## Install （安装）

```
$ npm install --save redis-token
```

## Usage （使用）

```javascript
var token = require('redis-token')

var options = { host: '127.0.0.1', port: '6379', password: '' }
// if you options is { host: '127.0.0.1', port: '6379', password: '' } 
// you can write like is  'var redisToken = token.redisToken();'
var redisToken = token.redisToken(options);

/*
insert value to redis get token (插入一条数据，获取一个令牌(token))
@parameter value
@parameter expire defalut is '0'  Permanent storage 
*/
redisToken.createToken('wjs',1000).then((key) => {
    console.log(key) // { token: 'qWWPJPHWngnjwjfHLuxQdCjqr4CVE9e0J51QIxSjfQmmbXl4DmwrT4PZj5nb72wj',success: true }
})

/*
get value from redis by key （依据令牌（token）获取数据）
@parameter key
*/
redisToken.getToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value)=>{
    console.log(value) // { tokenValue: 'wjs', success: true }
})

/*
kill token from redis by key（依据令牌（token）删除数据）
@parameter key
*/
redisToken.killToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value) => {
    console.log(value) // { kill: [ 1 ], success: true }
})
```

## Options

All options below are showing their default values. （下面的 option 显示的是默认值）

```javascript

var options = { 
    host: '127.0.0.1', // the redis server host, default is '127.0.0.1'
    port: '6379',  // the redis server port, default is '6379'
    password: '', // the redis password, default is ''
  }

```

## test

```
$ npm test
```