import { Db, MongoClient } from 'mongodb'
import { getSecretString } from '../utils/secrets.utils'
import { Secret } from '../utils/secrets.utils'

let client: Db

export default async function mongo() {
	if (!client) {
		const mongoUrl = await getSecretString(Secret.MongoUrl)
		client = new MongoClient(mongoUrl).db('the-cocktail-collective')
	}

	return client
}

export enum Collection {
	Users = 'users',
	Recipes = 'recipes',
}
