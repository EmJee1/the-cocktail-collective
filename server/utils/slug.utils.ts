import slugify from 'slugify'
import { generateNanoId } from './uuid.utils'

export function uniqueSlug(str: string) {
	const slug = slugify(str, {
		lower: true,
		strict: true,
	})
	const uid = generateNanoId()
	return `${uid}-${slug}`
}
