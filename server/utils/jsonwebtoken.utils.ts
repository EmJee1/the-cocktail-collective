import { sign } from 'jsonwebtoken'
import { DbUser } from '../models/User'
import { ConfigItem, getConfigString } from './config.utils'
import { ObjectId } from 'mongodb'

interface TokenPayload {
	_id: ObjectId
}

export async function signJwt(user: DbUser) {
	const secret = await getConfigString(ConfigItem.JwtSecret)
	const payload: TokenPayload = { _id: user._id }
	return sign(payload, secret, {
		expiresIn: '10h',
	})
}
