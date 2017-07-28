/*!
 * redis-token
 * Copyright(c) 2017 wjs
 * MIT Licensed
 */
'use strict';

const redis =require('redis');

let client = null;

// load options
let token = function(options) {
    this.init.call(this, options);
    return this;
}
token.prototype = {
    init: (options) => {
        options = options || {}
        this.host = options.host || '127.0.0.1';
        this.port = options.port || '6379';
        this.password = options.password || '';
        client = redis.createClient();
    },
    // insert data to redis
    createToken: function(value, deadLine = 0) {
        const key = this.token()
        return new Promise((resolve) => {
            if (client) {
                client.set(key, value)
                if (deadLine) {
                    client.expire(key, deadLine);
                }
                resolve({ token: key, success: true })
            }
            client.on('error', function(error) {
              console.error(error)
              resolve({ token: error, success: false })
            })
        })
    },
    // get value from redis by key
    getToken: function(key) {
        return new Promise((resolve) => {
          if (client) {
            client.get(key, (error, resp) => {
              resolve({ tokenValue: resp, success: true })
            })
          }
          client.on('error', (error) => {
            resolve({ error: error, success: false })
          })
        })
    },
    // kill token from redis by key
    killToken: function(key) {
        return new Promise((resolve) => {
            const mc = [['del', key]]
            if (client) {
              client.multi(mc).exec((err, resp) => {
                  if (err) {
                      resolve({ error: error, success: false })
                  } else {
                      resolve({ kill: resp, success: true })
                  }
              })
            }
            client.on('error', (error) => {
                console.error(error)
                resolve({ error: error, success: false })
            })
        })
    },
    // create token
    token: function() {
        var t = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < 55; i++) {
          t += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return t + 'Z' + new Date().getTime().toString(36);
    }
}

exports.redisToken = function (options) {
    return new token(options);
};
