const assert = require('power-assert')
const _ = require('lodash')
const uc = require('../../js/crawlers/united_cinemas')

describe('united_cinemas', ()=>{
  describe('fetchAll', ()=>{
    it('returns promised schedules', (done)=>{
      uc().then((result)=>{
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

