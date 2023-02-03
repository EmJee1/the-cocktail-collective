import type { ObjectId } from 'mongodb'
import type { User } from '../models/User'
import mongo from './database'

async function userCollection() {
	return (await mongo()).collection<User>('users')
}

export async function insertUser(user: User) {
	return (await userCollection()).insertOne(user)
}

export async function getUser(userId: ObjectId) {
	return (await userCollection()).findOne({ _id: userId })
}

export async function getUserByEmail(email: string) {
	return (await userCollection()).findOne({ email })
}
