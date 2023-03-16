import { MongoClient } from 'mongodb'
import { getSecretString } from '../utils/secrets.utils'
import { Secret } from '../utils/secrets.utils'
import { valueForEnvironment } from '../utils/environment.utils'

let connection: MongoClient | null = null

export default async function mongo() {
	if (!connection) {
		const mongoUrl = await getSecretString(Secret.MongoUrl)
		connection = new MongoClient(mongoUrl)
	}

	const database = valueForEnvironment({
		development: 'the-cocktail-collective',
		production: 'the-cocktail-collective',
		test: 'the-cocktail-collective-tests',
	})

	return connection.db(database)
}

export async function closeConnection() {
	await connection?.close()
	connection = null
}

export enum Collection {
	Users = 'users',
	Recipes = 'recipes',
}
