'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const devtestEnv = require('./devtest.env')
const testEnv = require('./test.env')
module.exports = merge(prodEnv,testEnv,devtestEnv, {
  NODE_ENV: '"development"',
  baseUrl: '"http://map.133.cn"',
  TIMEOUT: 10000
})
