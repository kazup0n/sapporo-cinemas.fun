const moment = require('moment-timezone')
const _ = require('lodash')

function daysUntillNextWednesday(today){
  const start = today.weekday()
  const nextWed = today.weekday() < 3 ? 3: 10
  return _.range(start, nextWed + 1).map(n => today.clone().weekday(n))
}

function daysUntillNextWednesdayFromToday(){
  return daysUntillNextWednesday(moment())
}

module.exports.daysUntillNextWednesday = daysUntillNextWednesday
module.exports.daysUntillNextWednesdayFromToday = daysUntillNextWednesdayFromToday