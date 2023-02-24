import { megabytesToBytes } from '../convert.utils'

describe('convert', () => {
	describe('megabytesToBytes', () => {
		it.each([
			[10, 10_000_000],
			[18683, 18683_000_000],
			[-12, -12_000_000],
		])('Should return correct amount for integer', (input, expected) => {
			expect(megabytesToBytes(input)).toBe(expected)
		})

		it.each([
			[6.068, 6_068_000],
			[0.04756, 47_560],
			[-2.856, -2_856_000],
		])(
			'Should return correct amount for floating point numbers',
			(input, expected) => {
				expect(megabytesToBytes(input)).toBe(expected)
			}
		)
	})
})
