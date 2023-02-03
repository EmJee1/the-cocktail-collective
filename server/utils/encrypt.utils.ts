import { genSalt, hash } from 'bcrypt'
import { ConfigItem, getConfigNumber } from './config.utils'

export async function hashString(str: string) {
	const saltRounds = await getConfigNumber(ConfigItem.BcryptSaltRounds)
	const salt = await genSalt(saltRounds)
	return hash(str, salt)
}
