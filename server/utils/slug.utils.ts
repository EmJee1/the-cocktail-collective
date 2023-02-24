import slugify from 'slugify'
import { generateNanoId } from './uuid.utils'

export function uniqueSlug(str: string) {
	const slug = slugify(str)
	const uid = generateNanoId()
	return `${uid}-${slug}`
}
