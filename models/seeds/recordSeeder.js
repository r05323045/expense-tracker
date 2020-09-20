const recordList = require('../../record.json')
const Record = require('../record.js')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  recordList.results.forEach(el => {
    Record.create(el)
  })
  console.log('done')
})
