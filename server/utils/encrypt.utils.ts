import { genSalt, hash, compare } from 'bcrypt'

const SALT_ROUNDS = 10 as const

export async function hashString(str: string) {
	const salt = await genSalt(SALT_ROUNDS)
	return hash(str, salt)
}

export async function compareHash(str: string, hash: string) {
	return compare(str, hash)
}
