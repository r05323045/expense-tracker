// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/recordModel')
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
router.get('/category', (req, res) => {
  const selectCategory = req.query.selectCategory
  let homeSelect, trafficSelect, leisureSelect, foodSelect, otherSelect
  if (selectCategory === '家居物業') {
    homeSelect = 'selected'
  } else if (selectCategory === '交通出行') {
    trafficSelect = 'selected'
  } else if (selectCategory === '休閒娛樂') {
    leisureSelect = 'selected'
  } else if (selectCategory === '餐飲食品') {
    foodSelect = 'selected'
  } else if (selectCategory === '其他') {
    otherSelect = 'selected'
  } else {
    return res.redirect('/')
  }
  return Record.find({ category: selectCategory })
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
      res.render('index', { records, totalAmount, homeSelect, trafficSelect, leisureSelect, foodSelect, otherSelect })
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router
