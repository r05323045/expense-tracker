const express = require('express')
const router = express.Router()
const Record = require('../../models/recordModel')
const Category = require('../../models/categoryModel')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 1 })
    .then(categories => res.render('new', { categories }))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      const date = String(record.date.getDate()).padStart(2, '0')
      const month = String(record.date.getMonth() + 1).padStart(2, '0')
      const year = String(record.date.getFullYear())
      const dateString = `${year}-${month}-${date}`
      Category.find()
        .lean()
        .sort({ _id: 1 })
        .then(categories => {
          categories.forEach(category => {
            if (record.category === category.name) {
              category.selected = true
            } else {
              category.selected = false
            }
          })
          res.render('edit', { record, dateString, categories })
        })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  return Record.create({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
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
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
