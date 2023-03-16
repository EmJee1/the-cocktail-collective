import { Db, MongoClient } from 'mongodb'
import { getSecretString } from '../utils/secrets.utils'
import { Secret } from '../utils/secrets.utils'
import { valueForEnvironment } from '../utils/environment.utils'

let client: Db

export default async function mongo() {
	if (!client) {
		const mongoUrl = await getSecretString(Secret.MongoUrl)
		const database = valueForEnvironment({
			development: 'the-cocktail-collective',
			production: 'the-cocktail-collective',
			test: 'the-cocktail-collective-tests',
		})

		client = new MongoClient(mongoUrl).db(database)
	}

	return client
}

export enum Collection {
	Users = 'users',
	Recipes = 'recipes',
}
