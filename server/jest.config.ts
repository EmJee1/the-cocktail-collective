import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test).ts'],
	setupFiles: ['./setup-jest.ts'],
}

export default config
