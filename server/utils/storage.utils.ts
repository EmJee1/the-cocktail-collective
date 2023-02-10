import { Storage } from '@google-cloud/storage'
import { ConfigItem, getConfigString } from './config.utils'

// Google authentication is done via application default credentials
// To set it up locally, follow the following guide:
// https://cloud.google.com/docs/authentication/provide-credentials-adc

const STORAGE_BUCKET = 'the-cocktail-collective-images'
export const STORAGE_BUCKET_URL = `https://storage.googleapis.com/${STORAGE_BUCKET}`

export async function getBucket() {
	const projectId = await getConfigString(ConfigItem.GoogleCloudProject)
	const storage = new Storage({
		projectId,
	})

	return storage.bucket(STORAGE_BUCKET)
}
