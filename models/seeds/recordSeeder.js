const recordList = require('../../recordData.json')
const Record = require('../recordModel')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  recordList.results.forEach(el => {
    Record.create(el)
  })
  console.log('done')
})
