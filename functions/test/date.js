const assert = require('power-assert')
const moment = require('moment-timezone')
const _ = require('lodash')

const daysUntillNextWednesday = require('../js/date').daysUntillNextWednesday
const daysUntillNextFriday = require('../js/date').daysUntillNextFriday

describe('date', ()=>{
  describe('#daysUntillNextWednesday', ()=>{
    it('returns days untill next wednesday', ()=>{
      const fixtures = {
        //mon
        '2018-03-12': ['2018-03-12', '2018-03-13', '2018-03-14'],
        //tue
        '2018-03-13': ['2018-03-13', '2018-03-14'],
        //wed
        '2018-03-14': _.range(14, 22).map(d => `2018-03-${d}`),
        //thu
        '2018-03-15': _.range(15, 22).map(d => `2018-03-${d}`),
        //fri
        '2018-03-16': _.range(16, 22).map(d => `2018-03-${d}`),
        //sat
        '2018-03-17': _.range(17, 22).map(d => `2018-03-${d}`),
        //sun
        '2018-03-18': _.range(18, 22).map(d => `2018-03-${d}`)
      }
      for(const d in fixtures){
        const days = daysUntillNextWednesday(moment(d)).map(d=>d.format('YYYY-MM-DD'))
        assert.deepEqual(days, fixtures[d])
      }
    })
  })

  describe('#daysUntillNextFriday', ()=>{
    it('returns days untill next friday', ()=>{
      const fixtures = {
        //mon
        '2018-03-12': _.range(12, 17).map(d => `2018-03-${d}`),
        //tue
        '2018-03-13': _.range(13, 17).map(d => `2018-03-${d}`),
        //wed
        '2018-03-14': _.range(14, 24).map(d => `2018-03-${d}`),
        //thu
        '2018-03-15': _.range(15, 24).map(d => `2018-03-${d}`),
        //fri
        '2018-03-16': _.range(16, 24).map(d => `2018-03-${d}`),
        //sat
        '2018-03-17': _.range(17, 24).map(d => `2018-03-${d}`),
        //sun
        '2018-03-18': _.range(18, 24).map(d => `2018-03-${d}`),
      }
      for(const d in fixtures){
        const days = daysUntillNextFriday(moment(d)).map(d=>d.format('YYYY-MM-DD'))
        assert.deepEqual(days, fixtures[d])
      }
    })
  })

})