const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('-------- begin ---------')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('body: ', request.body)
  logger.info('params: ', request.params)
  logger.info('-------- end ---------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    code: -1,
    data: null,
    msg: 'unknown endpoint',
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error('errorHandler: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      code: -1,
      data: null,
      msg: 'malformatted id',
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      code: -1,
      data: null,
      msg: error.message,
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
