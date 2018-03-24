
const client = require('cheerio-httpcli')
const _ = require('lodash')
const logger = require('../logger')

const daysUntillNextFridayFromToday = require('../date').daysUntillNextFridayFromToday

const BASE_URL = 'http://www.cinemafrontier.net'

/**
 * fetch
 * @param {Date} date
 */
function fetch(date) {
  const url = BASE_URL + '/cgi-bin/pc/site/det.cgi'
  const params = {
    ymd: date.tz('Asia/Tokyo').format('YYYY-MM-DD'),
    tsc: 1
  }

  logger.info(`fetching`, {url: url, params: params})

  return client.fetch(url, params).then(function (result) {
    return result.$('.sc-item').map(function () {
      const title = result.$(this).find('.title').text()
      const schedules = result.$(this).find('.time').map(function () {
        return result.$(this).text()
      })
      return {
        title: title,
        schedules: schedules
      }
    })
  }).then(transformResult(date))
}

function stripAll(s) {
  return s.replace(/[\t\n ]/g, '')
}


function transformResult(date) {
  return (raw_result) => {
    return raw_result.map(function (idx, movie) {
      const schedules = movie.schedules.toArray().map((s) => stripAll(s).split('～'))
      const title = stripAll(movie.title)

      const transformed =  {
        schedules: schedules,
        title: title,
        date: date.tz('Asia/Tokyo'),
        theater: 'cf'
      }
      logger.trace('transformed schedules for date', {
        date: date,
        transformed: transformed,
        title: title})
      return transformed
    }).toArray()
  }
}

function fetchAll() {
  //毎週水曜日に3日後の土曜～翌週金曜日が更新される
  logger.info('start fetching cf')
  const days = daysUntillNextFridayFromToday()
  return Promise.all(_.map(days, fetch)).then(_.flatten)
}
module.exports = fetchAll