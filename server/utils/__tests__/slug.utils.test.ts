import { uniqueSlug } from '../slug.utils'

describe('slug', () => {
	describe('uniqueSlug', () => {
		it.each(['cosmopolitan', 'old fashioned', 'moscow mule'])(
			'Should generate unique slugs with the same input',
			input => {
				expect(uniqueSlug(input)).not.toBe(uniqueSlug(input))
			}
		)

		it.each(['margarita', 'negroni', 'hurricane'])(
			'Last part of the slug should be the input name',
			input => {
				expect(uniqueSlug(input)).toContain(input)
			}
		)

		it.each([
			['espresso martini', 'espresso-martini'],
			['mai tai', 'mai-tai'],
			['long island iced tea', 'long-island-iced-tea'],
		])('Should replace spaces with dashes', (input, expected) => {
			expect(uniqueSlug(input)).toContain(expected)
		})

		it.each([
			['ir@is^h cof*fee', 'irish-coffee'],
			['()%d^#ai@(qui!±ri§', 'daiquiri'],
			['aperol spritz!?', 'aperol-spritz'],
		])('Should remove special characters', (input, expected) => {
			expect(uniqueSlug(input)).toContain(expected)
		})
	})
})
