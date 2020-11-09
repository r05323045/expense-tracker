const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const recordList = require('../../recordData.json')
const Record = require('../recordModel')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: '老爸',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordList.results.length },
        (_, i) => {
          recordList.results[i].userId = userId
          return Record.create(recordList.results[i])
        }
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
