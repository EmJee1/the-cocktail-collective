import { WithId } from 'mongodb'

export interface User {
	email: string
	password: string
}

export type DbUser = WithId<User>
