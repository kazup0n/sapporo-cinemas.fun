const client = require('cheerio-httpcli')
const moment = require('moment-range').extendMoment(require('moment-timezone'))
const _ = require('lodash')

const logger = require('../logger')
const TZ = require('../tz')


const BASE_URL = 'http://www.theaterkino.net'

const PAGES = {
  a: '/ttA.html',
  b: '/ttB.html'
}

function fetch(page) {
  const url = BASE_URL + PAGES[page]

  logger.info('fetching',{url: url})

  return client.fetch(url).then(result => {
    const days = result.$('#days>h2').text()
    const titles = result.$('.ttl').map((i, s) => result.$(s).text())
    const schedules = result.$('table[width="100%"]').map(function () {
      return {
        starts: result.$(this).find('tr:first-child td').map((i, s) => result.$(s).text()),
        ends: result.$(this).find('tr:last-child td').map((i, s) => result.$(s).text())
      }
    })
    return {
      days: days,
      titles: titles,
      schedules: schedules.toArray()
    }
  })
}

function transformResult(rawResult) {

  const days = _(rawResult.days.split('～'))
    .map(s => s.match(/(\d+\/\d+)/)[0])
    .map(s => moment.tz(s, 'MM/DD', TZ))
    .value()
  return _.flatMap(Array.from(moment.range(days[0], days[1]).by('day')), (date) => {
    return rawResult.titles.map((idx, title) => {
      const rawSchedules = rawResult.schedules[idx]
      const starts = _(rawSchedules.starts).map(s => _.head(s.match(/(\d+:\d+)/))).compact().value()
      const ends = _(rawSchedules.ends).map(s => _.head(s.match(/(\d+:\d+)/))).compact().value()
      const hours = _.zip(starts, ends)
      return {
        theater: 'kino',
        title: title.replace('■', ''),
        date: date,
        schedules: hours
      }
    }).toArray()
  })
}

function fetchAll() {
  logger.info('start fetching kino')
  return Promise.all(['a', 'b'].map(p => fetch(p).then(transformResult))).then(_.flatten)
}

module.exports = fetchAll