import crypto from 'node:crypto'

export function generateId() {
	return crypto.randomUUID()
}
