import { compareHash, hashString } from '../encrypt.utils'

const encryptable = 'input'

describe('encrypt', () => {
	describe('hashString', () => {
		it('Should return a string', async () => {
			expect(typeof (await hashString(encryptable))).toBe('string')
		})
	})

	describe('compareHash', () => {
		it('Should return true for the correct input', async () => {
			const encrypted = await hashString(encryptable)
			expect(await compareHash(encryptable, encrypted)).toBe(true)
		})

		it('Should return false for an incorrect input', async () => {
			const encrypted = await hashString(encryptable)
			expect(await compareHash('incorrect', encrypted)).toBe(false)
		})
	})
})
