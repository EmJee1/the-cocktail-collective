import { join as joinPath } from 'node:path'
import { readFile } from 'node:fs/promises'
import { DotenvParseOutput, parse as parseDotenv } from 'dotenv'

export enum ConfigItem {
	MongoUrl = 'MONGODB_URL',
	BcryptSaltRounds = 'BCRYPT_SALT_ROUNDS',
}

export async function getConfigString(configItem: ConfigItem) {
	const config = await getConfig()
	const item = config[configItem]
	if (!item) {
		throw new Error(
			`Expected type string for config variable '${configItem}', received undefined`
		)
	}

	return item
}

export async function getConfigNumber(configItem: ConfigItem) {
	const str = await getConfigString(configItem)
	const num = Number(str)
	if (Number.isNaN(num)) {
		throw new Error(
			`Expected type number for config variable '${configItem}', received NaN`
		)
	}

	return num
}

let config: DotenvParseOutput

async function getConfig() {
	if (!config) {
		const envFile = joinPath(__dirname, '..', '.env')
		const envFileContents = await readFile(envFile)
		config = parseDotenv(envFileContents)
	}

	return config
}
