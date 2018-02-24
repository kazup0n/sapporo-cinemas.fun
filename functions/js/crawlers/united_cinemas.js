const client = require('cheerio-httpcli')
const _ = require('lodash')
const moment = require('moment-timezone')

const BASE_URL = 'https://www.unitedcinemas.jp'

/**
 * fetch
 * @param {Date} date
 */
function fetch(date) {
  const url = BASE_URL + '/sapporo/daily.php'
  const params = { date: date.tz('Asia/Tokyo').format('YYYY-MM-DD') }

  return client.fetch(url, params).then(function (result) {
    return result.$('#dailyList > li').map(function (idx) {
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
      return {
        schedules: schedules,
        title: title,
        date: date.tz('Asia/Tokyo'),
        theater: 'uc'
      }
    }).toArray()
  }
}

function fetchAll() {
  //次の水曜日まで
  const days = _.range(11 - moment().weekday() + 1, 11).map(n => moment().weekday(n))
  return Promise.all(_.map(days, fetch)).then(_.flatten)
}
module.exports = fetchAll