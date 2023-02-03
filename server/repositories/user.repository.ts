import type { ObjectId } from 'mongodb'
import type { User } from '../models/User'
import mongo from './database'

export async function insertUser(user: User) {
	return (await mongo()).collection('users').insertOne(user)
}

export async function getUser(userId: ObjectId) {
	return (await mongo()).collection('users').findOne({ _id: userId })
}
