import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { Secret } from './secrets.utils'
import { GOOGLE_CLOUD_PROJECT_NUMBER } from './constants.utils'
import logger from './logging.utils'

// Google authentication is done via application default credentials
// To set it up locally, follow the following guide:
// https://cloud.google.com/docs/authentication/provide-credentials-adc

const secretManager = new SecretManagerServiceClient()
const secretManagerMemCache: Record<string, string> = {}

const SECRET_NAME_PREFIX = `projects/${GOOGLE_CLOUD_PROJECT_NUMBER}/secrets`

export async function getSecret(secretName: Secret) {
	const name = `${SECRET_NAME_PREFIX}/${secretName}/versions/1`
	if (secretManagerMemCache[secretName]) {
		return secretManagerMemCache[secretName]
	}

	logger.info(`Loading secret '${secretName}' from secret-manager`)
	const [version] = await secretManager.accessSecretVersion({ name })
	const payload = version.payload?.data?.toString()
	if (payload) {
		secretManagerMemCache[secretName] = payload
	}

	return payload
}
