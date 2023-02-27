import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { Secret } from './secrets.utils'

// Google authentication is done via application default credentials
// To set it up locally, follow the following guide:
// https://cloud.google.com/docs/authentication/provide-credentials-adc

const secretManager = new SecretManagerServiceClient()
const secretManagerMemCache: Record<string, string> = {}

export async function getSecret(name: Secret) {
	if (secretManagerMemCache[name]) {
		return secretManagerMemCache[name]
	}

	const [version] = await secretManager.accessSecretVersion({ name })
	const payload = version.payload?.data?.toString()
	if (payload) {
		secretManagerMemCache[name] = payload
	}

	return payload
}
