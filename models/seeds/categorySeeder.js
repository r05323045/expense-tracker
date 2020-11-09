if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../categoryModel')
const db = require('../../config/mongoose')

db.once('open', () => {
  const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  return Promise.all(Array.from(
    { length: categoryList.length },
    (_, i) => {
      return Category.create({ name: categoryList[i] })
    }
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
