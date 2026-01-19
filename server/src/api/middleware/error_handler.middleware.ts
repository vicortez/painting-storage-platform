import { UnauthorizedError } from '#src/models/errors.model.ts'
import type { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = async (err, req, res, next): Promise<void> => {
  if (!(err instanceof Error)) {
    console.error(`Disaster: An error was thrown but its not an error object!`)
    next(err)
    return
  }

  if (err instanceof UnauthorizedError) {
    let errorMsg = 'authorization_error'
    if (err.message === 'missing_token') {
      errorMsg = 'missing_token'
    }
    res.status(401).json({ error: errorMsg })
    next(err)
    return
  }

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    res.status(500).json({ error: err.message })
    next(err)
    return
  }

  next(err)
}

export default errorHandlerMiddleware
