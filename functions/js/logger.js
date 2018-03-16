const bunyan = require('bunyan')

const log = bunyan.createLogger({
  name: 'crawlers',
  stream: process.stdout,
  level: process.env.logLevel ||  'debug'
})

module.exports = log