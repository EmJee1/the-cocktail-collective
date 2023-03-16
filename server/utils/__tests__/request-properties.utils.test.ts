import { createRequest } from 'node-mocks-http'
import { ObjectId } from 'mongodb'
import type { DbUser, User } from 'models/user'
import { getRequestUser, getRequestUserId } from '../request-properties.utils'
import mongo, { closeConnection, Collection } from '../../repositories/database'
import { insertUser } from '../../repositories/user.repository'

afterAll(async () => {
	await (await mongo()).dropCollection(Collection.Users)
	await closeConnection()
})

describe('request-properties', () => {
	describe('get-request-user-id', () => {
		it('Should return user-id for the request', () => {
			const userId = new ObjectId()
			const request = createRequest({ userId })
			expect(getRequestUserId(request).toString()).toBe(userId.toString())
		})

		it('Should throw an error if the user-id is not present', () => {
			const request = createRequest()
			expect(() => getRequestUserId(request)).toThrowError()
		})
	})

	describe('get-request-user', () => {
		it('Should return the user on the request when it is already set', async () => {
			const user = { _id: new ObjectId() } as DbUser
			const request = createRequest({ user })
			expect((await getRequestUser(request))._id.toString()).toBe(
				user._id.toString()
			)
		})

		it('Should fetch the user by id when it is not set', async () => {
			const { insertedId } = await insertUser({} as User)
			const request = createRequest({ userId: insertedId })
			expect((await getRequestUser(request))._id.toString()).toBe(
				insertedId.toString()
			)
		})
	})
})
