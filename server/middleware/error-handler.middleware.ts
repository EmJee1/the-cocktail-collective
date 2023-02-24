import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logging.utils'
import { internalServerError } from '../utils/response.utils'

export default function errorHandler(
	err: Error,
	_: Request,
	res: Response,
	__: NextFunction // This unused parameter is required so that express knows this is an error handling function
) {
	logger.error(err.message)
	return internalServerError(res)
}
