const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const hostname = `${require('address').ip()}`

const server = http.createServer(app)

server.listen(config.PORT, hostname, () => {
  logger.info(`Server running on: http://${hostname}:${config.PORT}`)
})
