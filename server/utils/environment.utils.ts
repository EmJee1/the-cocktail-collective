import * as process from 'process'

export enum Environment {
	Production = 'production',
	Development = 'development',
}

export function getEnvironment() {
	const env = process.env.NODE_ENV
	switch (env) {
		case Environment.Development:
			return Environment.Development
		case Environment.Production:
			return Environment.Production
		default:
			throw new Error(`Unknown environment: '${env}'`)
	}
}

export function isEnvironment(environment: Environment) {
	const env = process.env.NODE_ENV
	return env === environment
}
