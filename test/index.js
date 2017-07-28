
var assert = require('assert')
var token = require('../index')
var key = ''

var options = { host: '127.0.0.1', port: '6379', password: '' }
var redisToken = token.redisToken(options);

describe('redis token',function () {
    it('should get a token', function(done) {
        redisToken.createToken('wjs').then((key) => {
            key = key.token
            assert.notEqual(key.token, undefined)
            assert.notEqual(key.token, null)
            assert.notEqual(token, '')
            assert.equal(true,key.success)
        })
        done();
    })
    it('should get a value', function(done) {
        redisToken.getToken(key).then((value) => {
            assert.equal(true, value.success)
            assert.equal('bar', value.tokenValue)
            assert.notEqual(key.tokenValue, undefined)
            assert.notEqual(key.tokenValue, null)
            assert.notEqual(tokenValue, '')
        })
        done()
    })
    it('should kill a token', function(done) {
       redisToken.killToken(key).then((value) => {
            assert.equal(true, value.success)
        })
        done()
    })
})