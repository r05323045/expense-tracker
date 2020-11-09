const express = require('express')
const router = express.Router()
const Record = require('../../models/recordModel')
const Category = require('../../models/categoryModel')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
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
      Category.find()
        .lean()
        .sort({ _id: 1 })
        .then(categories => {
          categories.forEach(category => {
            category.selected = false
          })
          res.render('index', { records, totalAmount, categories })
        })
    })
    .catch(error => console.error(error))
})
router.get('/category', (req, res) => {
  const selectCategory = req.query.selectCategory
  const userId = req.user._id
  if (selectCategory === '類別') {
    return res.redirect('/')
  }
  return Record.find({ category: selectCategory, userId })
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
      Category.find()
        .lean()
        .sort({ _id: 1 })
        .then(categories => {
          categories.forEach(category => {
            if (selectCategory === category.name) {
              category.selected = true
            } else {
              category.selected = false
            }
          })
          res.render('index', { records, totalAmount, categories })
        })
    })
    .catch(error => console.log(error))
})
module.exports = router
