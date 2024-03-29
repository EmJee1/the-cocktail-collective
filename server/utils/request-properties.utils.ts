import type { Request } from 'express'
import type { DbUser } from 'models/user'
import { getUser } from '../repositories/user.repository'

type AnyRequest = Request<any, any, any, any, any>

export function getRequestUserId(req: AnyRequest) {
	if (!req.userId) {
		throw new Error('UserId is not defined on request')
	}

	return req.userId
}

export async function getRequestUser(req: AnyRequest): Promise<DbUser> {
	if (req.user) {
		return req.user
	}

	const user = await getUser(getRequestUserId(req))
	if (!user) {
		throw new Error('The user that token belongs to does not exist')
	}

	req.user = user
	return user
}
