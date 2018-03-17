'use strict';

const _ = require('lodash')
const kino = require('./js/crawlers/kino')
const uc = require('./js/crawlers/united_cinemas')
const cf = require('./js/crawlers/cinema_frontier')
const logger = require('./js/logger')
const {putObject} = require('./js/s3')

function start_crawler(event, context, callback) {
  Promise.all([kino(), uc(), cf()]).then(result => {
    const grouped = _(result)
      .flatten()
      .map(s => {
        const r = {
          date: s.date.format('YYYY-MM-DD'),
          title: s.title,
          schedules: s.schedules,
          theater: s.theater
        }
        logger.debug({date: r.date, theater: r.theater, count: r.schedules.length, title: s.title})
        return r
      })
      .groupBy('date')
      .value()
    putObject(grouped).then(()=>{
      callback(null, null);
    }).catch(err => {
      callback(err)
    })


  })
}

module.exports.start_crawler = start_crawler