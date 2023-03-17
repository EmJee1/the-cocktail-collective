export enum Environment {
	Production = 'production',
	Test = 'test',
	Development = 'development',
}

export function getEnvironment() {
	const environmentFlagIndex = process.argv.indexOf('--environment')
	const env = process.argv[environmentFlagIndex + 1]
	switch (env) {
		case Environment.Development:
			return Environment.Development
		case Environment.Test:
			return Environment.Test
		case Environment.Production:
			return Environment.Production
		default:
			throw new Error(`Unknown environment: '${env}'`)
	}
}

export function valueForEnvironment<T>(values: Record<Environment, T>) {
	const env = getEnvironment()
	return values[env]
}

export function isEnvironment(environment: Environment) {
	const env = getEnvironment()
	return env === environment
}
