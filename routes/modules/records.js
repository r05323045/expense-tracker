const express = require('express')
const router = express.Router()
const Record = require('../../models/recordAgain')

router.get('/new', (req, res) => {
  const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品']
  return res.render('new', { categoryList })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品']
  let dateString
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = record.date.toLocaleDateString()
      dateString = '2020-09-20' /* 無法理解為何上面的 record.date 同樣是 string 卻不能顯示在 edit.hbs:26 的 input value 上 */
      console.log(record.date === dateString)
      res.render('edit', { record, categoryList, dateString })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  return Record.create({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  console.log(req.body)
  return Record.findById(id)
    .then(record => {
      console.log(req.body)
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router
