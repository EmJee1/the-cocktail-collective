import { valueForEnvironment } from './environment.utils'
import { getSecret as getDotenvSecret } from './dotenv.utils'
import { getSecret as getSecretManagerSecret } from './secret-manager.utils'

/**
 * In development use secrets from the local .env file
 * In production use the secrets from Google secret-manager
 */

export enum Secret {
	MongoUrl = 'MONGODB_URL',
	JwtSecret = 'JWT_SECRET',
}

export async function getSecretString(name: Secret) {
	const payload = await valueForEnvironment({
		development: () => getDotenvSecret(name),
		test: () => getDotenvSecret(name),
		production: () => getSecretManagerSecret(name),
	})()

	if (!payload) {
		throw new Error(
			`Expected type string for secret '${name}', received undefined`
		)
	}

	return payload
}

export async function getSecretNumber(name: Secret) {
	const str = await getSecretString(name)
	const num = Number(str)
	if (Number.isNaN(num)) {
		throw new Error(
			`Expected type number for config variable '${name}', received NaN`
		)
	}

	return num
}
