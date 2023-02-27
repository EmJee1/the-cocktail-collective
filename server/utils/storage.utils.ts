import { Storage } from '@google-cloud/storage'
import { GOOGLE_CLOUD_PROJECT } from './constants.utils'

// Google authentication is done via application default credentials
// To set it up locally, follow the following guide:
// https://cloud.google.com/docs/authentication/provide-credentials-adc

const STORAGE_BUCKET = 'the-cocktail-collective-images' as const
export const STORAGE_BUCKET_URL =
	`https://storage.googleapis.com/${STORAGE_BUCKET}` as const

export function getBucket() {
	const storage = new Storage({
		projectId: GOOGLE_CLOUD_PROJECT,
	})

	return storage.bucket(STORAGE_BUCKET)
}
