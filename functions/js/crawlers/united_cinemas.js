const client = require('cheerio-httpcli')
const _ = require('lodash')
const logger = require('../logger')

const daysUntillNextWednesdayFromToday = require('../date').daysUntillNextWednesdayFromToday

const BASE_URL = 'https://www.unitedcinemas.jp'

/**
 * fetch
 * @param {Date} date
 */
function fetch(date) {
  const url = BASE_URL + '/sapporo/daily.php'
  const params = { date: date.tz('Asia/Tokyo').format('YYYY-MM-DD') }

  logger.info(`fetching`, {url: url, params: params})

  return client.fetch(url, params).then(function (result) {
    return result.$('#dailyList > li').map(function () {
      const title = result.$(this).find('.movieTitle').text()
      const schedules = result.$(this).find('ul.tl > li > ol > li').map(function () {
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
        theater: 'uc'
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
  //次の水曜日まで
  logger.info('start fetching united cinema')
  const days = daysUntillNextWednesdayFromToday()
  return Promise.all(_.map(days, fetch)).then(_.flatten)
}
module.exports = fetchAll