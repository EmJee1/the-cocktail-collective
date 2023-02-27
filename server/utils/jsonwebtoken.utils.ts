import { sign, verify } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { getSecretString, Secret } from './secrets.utils'

interface TokenPayload {
	/**
	 * UserId
	 */
	_id: ObjectId
}

export async function signJwt(payload: TokenPayload) {
	const secret = await getSecretString(Secret.JwtSecret)
	return sign(payload, secret, {
		expiresIn: '10h',
	})
}

export async function verifyJwt(token: string): Promise<TokenPayload> {
	const secret = await getSecretString(Secret.JwtSecret)
	const decoded = verify(token, secret)
	// Expect payload to contain the user-id
	if (typeof decoded === 'string' || !decoded._id) {
		throw new Error('Invalid jwt payload')
	}

	return {
		_id: new ObjectId(decoded._id),
	}
}
