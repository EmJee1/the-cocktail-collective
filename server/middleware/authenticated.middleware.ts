import { NextFunction, Request, Response } from 'express'
import { unauthorized } from '../utils/response.utils'
import { verifyJwt } from '../utils/jsonwebtoken.utils'

export default async function authenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const header = req.headers.authorization
	if (!header) {
		return unauthorized(res, 'You are not logged in')
	}

	const [type, token] = header.split(' ')
	if (type !== 'Bearer') {
		return unauthorized(res, 'Token should be of type Bearer')
	}

	try {
		const payload = await verifyJwt(token)
		req.userId = payload._id
	} catch (err) {
		return unauthorized(res, 'The token is invalid or expired')
	}

	next()
}
