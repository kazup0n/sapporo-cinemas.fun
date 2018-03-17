const assert = require('power-assert')
const _ = require('lodash')
const cf = require('../../js/crawlers/cinema_frontier')

describe('cinema_frontier', ()=>{
  describe('fetchAll', ()=>{
    it('returns promised schedules', (done)=>{
      cf().then((result)=>{
        assert(result.length > 0)
        assert.deepEqual(
          _.sortBy(Object.keys(result[0])),
          _.sortBy(['theater','title','date','schedules'])
        )
        done()
      })
    })
  })
})

