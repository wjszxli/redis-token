var token = require('../index')

var options = { host: '127.0.0.1', port: '6379', password: '' }
// if you options is { host: '127.0.0.1', port: '6379', password: '' } 
// you can write like is  'var redisToken = token.redisToken();'
var redisToken = token.redisToken(options);

redisToken.createToken('wjs').then((key) => {
    console.log(key) // { token: 'qWWPJPHWngnjwjfHLuxQdCjqr4CVE9e0J51QIxSjfQmmbXl4DmwrT4PZj5nb72wj',success: true }
})

redisToken.getToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value)=>{
    console.log(value) // { tokenValue: 'wjs', success: true }
})

redisToken.killToken('37vTMnF5S8SMcgIjmULh6gzaG60txCktvtEljyhtLr48bPPq8rbE0AKZj5m9tgoi').then((value) => {
    console.log(value) // { kill: [ 1 ], success: true }
})