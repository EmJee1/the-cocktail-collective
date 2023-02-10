import { Storage } from '@google-cloud/storage'
import { ConfigItem, getConfigString } from './config.utils'

// Google authentication is done via application default credentials
// To set it up locally, follow the following guide:
// https://cloud.google.com/docs/authentication/provide-credentials-adc

export async function getBucket() {
	const projectId = await getConfigString(ConfigItem.GoogleCloudProject)
	const storage = new Storage({
		projectId,
	})

	return storage.bucket('the-cocktail-collective-images')
}
