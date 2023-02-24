import { ObjectId } from 'mongodb'
import { signJwt, verifyJwt } from '../jsonwebtoken.utils'

const payload = { _id: new ObjectId() }

describe('jsonwebtoken', () => {
	describe('signJwt', () => {
		it('Should return a string', async () => {
			expect(typeof (await signJwt(payload))).toBe('string')
		})
	})

	describe('verifyJwt', () => {
		it('Should return the payload', async () => {
			const signed = await signJwt(payload)
			expect(await verifyJwt(signed)).toEqual(payload)
		})
	})
})
