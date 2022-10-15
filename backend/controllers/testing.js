const Note = require('../models/note')
const User = require('../models/user')

const testingRouter = require('express').Router()

testingRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter
