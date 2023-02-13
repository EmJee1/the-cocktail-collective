import { WithId } from 'mongodb'

export interface User {
	firstName: string
	lastName: string
	email: string
	password: string
}

export type DbUser = WithId<User>
