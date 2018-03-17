const moment = require('moment-timezone')
const _ = require('lodash')

function daysUntillNextWednesday(today){
  const start = today.weekday()
  const nextWed = today.weekday() < 3 ? 3: 10
  return _.range(start, nextWed + 1).map(n => today.clone().weekday(n))
}


function daysUntillNextFriday(today){
  const start = today.weekday()
  const nextFri = today.weekday() < 3 ? 5: 12
  return _.range(start, nextFri + 1).map(n => today.clone().weekday(n))
}

function daysUntillNextWednesdayFromToday(){
  return daysUntillNextWednesday(moment())
}

function daysUntillNextFridayFromToday(){
  return daysUntillNextFriday(moment())
}

module.exports.daysUntillNextWednesday = daysUntillNextWednesday
module.exports.daysUntillNextWednesdayFromToday = daysUntillNextWednesdayFromToday

module.exports.daysUntillNextFriday = daysUntillNextFriday
module.exports.daysUntillNextFridayFromToday = daysUntillNextFridayFromToday