const Category = require('../categoryModel')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  categoryList.forEach(el => {
    Category.create({ name: el })
  })
  console.log('done')
})
