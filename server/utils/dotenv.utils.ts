import { join as joinPath } from 'node:path'
import { readFile } from 'node:fs/promises'
import { DotenvParseOutput, parse as parseDotenv } from 'dotenv'
import { Secret } from './secrets.utils'
import { Environment, getEnvironment } from './environment.utils'
import logger from './logging.utils'

export async function getSecret(configItem: Secret) {
	const config = await getConfig(getEnvironment())
	return config[configItem]
}

let config: DotenvParseOutput

async function getConfig(environment: Environment) {
	if (!config) {
		const envFilename =
			environment === Environment.Test ? '.env.test' : '.env.local'
		logger.info(`Loading secrets from ${envFilename}`)
		const envFilepath = joinPath(__dirname, '..', envFilename)
		const envFileContents = await readFile(envFilepath)
		config = parseDotenv(envFileContents)
	}

	return config
}
