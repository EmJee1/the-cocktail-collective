import { ObjectId } from 'mongodb'
import type { DbUser } from 'models/user'

export {}

declare global {
	namespace Express {
		export interface Request {
			userId: ObjectId
			user?: DbUser
		}
	}
}
