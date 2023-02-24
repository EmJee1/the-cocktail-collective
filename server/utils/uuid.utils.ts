import crypto from 'node:crypto'

export function generateId() {
	return crypto.randomUUID()
}

export function generateNanoId() {
	const [nanoId] = generateId().split('-')
	return nanoId
}
