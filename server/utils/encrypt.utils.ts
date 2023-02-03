import { genSalt, hash, compare } from 'bcrypt'
import { ConfigItem, getConfigNumber } from './config.utils'

export async function hashString(str: string) {
	const saltRounds = await getConfigNumber(ConfigItem.BcryptSaltRounds)
	const salt = await genSalt(saltRounds)
	return hash(str, salt)
}

export async function compareHash(str: string, hash: string) {
	return compare(str, hash)
}
