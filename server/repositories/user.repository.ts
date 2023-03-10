import type { ObjectId, UpdateFilter } from 'mongodb'
import type { User } from 'models/user'
import mongo, { Collection } from './database'

async function userCollection() {
	return (await mongo()).collection<User>(Collection.Users)
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

export async function updateUser(
	userId: ObjectId,
	update: UpdateFilter<User> | Partial<User>
) {
	return (await userCollection()).updateOne({ _id: userId }, update)
}
