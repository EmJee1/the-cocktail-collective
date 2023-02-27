/**
 * Constants are variables that are identical in all environments (dev, test, prod)
 * Constants should never be secrets, secrets should be stored in Google Secret Manager
 */

export const GOOGLE_CLOUD_PROJECT = 'the-cocktail-collective' as const
