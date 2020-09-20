// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// 設定首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: -1 })
    .then(records => {
      const totalAmount = records.reduce((acc, cur) => acc + cur.amount, 0)
      records.forEach(el => {
        switch (el.category) {
          case '家居物業':
            el.categoryHTML = '<i class="fas fa-home"></i>'
            break
          case '交通出行':
            el.categoryHTML = '<i class="fas fa-shuttle-van"></i>'
            break
          case '休閒娛樂':
            el.categoryHTML = '<i class="fas fa-grin-beam"></i>'
            break
          case '餐飲食品':
            el.categoryHTML = '<i class="fas fa-utensils"></i>'
            break
          case '其他':
            el.categoryHTML = '<i class="fas fa-pen"></i>'
            break
        }
        el.date = el.date.toLocaleDateString()
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
router.get('/sort', (req, res) => {
  const sortBy = req.query.sortBy
  let order = { date: -1 }
  let ascSelect, dscSelect, categorySelect, amountAscSelect, amountDscSelect
  if (sortBy === 'asc') {
    order = { date: 1 }
    ascSelect = 'selected'
  } else if (sortBy === 'category') {
    order = { category: 1 }
    categorySelect = 'selected'
  } else if (sortBy === 'amountAsc') {
    order = { amount: 1 }
    amountAscSelect = 'selected'
  } else if (sortBy === 'amountDsc') {
    order = { amount: -1 }
    amountDscSelect = 'selected'
  } else {
    dscSelect = 'selected'
  }
  return Record.find()
    .lean()
    .sort(order)
    .then(records => {
      const totalAmount = records.reduce((acc, cur) => acc + cur.amount, 0)
      records.forEach(el => {
        switch (el.category) {
          case '家居物業':
            el.categoryHTML = '<i class="fas fa-home"></i>'
            break
          case '交通出行':
            el.categoryHTML = '<i class="fas fa-shuttle-van"></i>'
            break
          case '休閒娛樂':
            el.categoryHTML = '<i class="fas fa-grin-beam"></i>'
            break
          case '餐飲食品':
            el.categoryHTML = '<i class="fas fa-utensils"></i>'
            break
          case '其他':
            el.categoryHTML = '<i class="fas fa-pen"></i>'
            break
        }
        el.date = el.date.toLocaleDateString()
      })
      res.render('index', { records, totalAmount, ascSelect, dscSelect, categorySelect, amountAscSelect, amountDscSelect })
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router
