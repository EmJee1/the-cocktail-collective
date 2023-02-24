import { generateId, generateNanoId } from '../uuid.utils'

describe('uuid', () => {
	describe('generateId', () => {
		it("Should generate random id's", () => {
			expect(generateId()).not.toBe(generateId())
		})
	})

	describe('generateNanoId', () => {
		it("Should generate random id's", () => {
			expect(generateNanoId()).not.toBe(generateNanoId())
		})
	})
})
