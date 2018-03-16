const assert = require('power-assert')
const moment = require('moment-timezone')

const daysUntillNextWednesday = require('../js/date').daysUntillNextWednesday

describe('date', ()=>{
  describe('#daysUntillNextWednesday', ()=>{
    it('returns days untill next wednesday', ()=>{

      const fixtures = {
        //mon
        '2018-03-12': ['2018-03-12', '2018-03-13', '2018-03-14'],
        //tue
        '2018-03-13': ['2018-03-13', '2018-03-14'],
        //wed
        '2018-03-14': ['2018-03-14', '2018-03-15', '2018-03-16', '2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21'],
        //thu
        '2018-03-15': ['2018-03-15', '2018-03-16', '2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21'],
        //fri
        '2018-03-16': ['2018-03-16', '2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21'],
        //sat
        '2018-03-17': ['2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21'],
        //sun
        '2018-03-18': ['2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21']
      }

      for(const d in fixtures){
        const days = daysUntillNextWednesday(moment(d)).map(d=>d.format('YYYY-MM-DD'))
        assert.deepEqual(days, fixtures[d])
      }
    })
  })
})