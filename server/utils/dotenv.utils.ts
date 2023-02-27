import { join as joinPath } from 'node:path'
import { readFile } from 'node:fs/promises'
import { DotenvParseOutput, parse as parseDotenv } from 'dotenv'
import { Secret } from './secrets.utils'

export async function getSecret(configItem: Secret) {
	const config = await getConfig()
	return config[configItem]
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
