const assert = require('power-assert')
const _ = require('lodash')
const kino = require('../../js/crawlers/kino')

describe('kino', ()=>{
  describe('fetchAll', ()=>{
    it('returns promised schedules', function(){
      this.timeout(5000)
      return kino().then((result)=>{
        assert(result.length > 0)
        assert.deepEqual(
          _.sortBy(Object.keys(result[0])),
          _.sortBy(['theater','title','date','schedules'])
        )
      })
    })
  })
})

