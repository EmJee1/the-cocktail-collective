import { Db, MongoClient } from 'mongodb'
import { ConfigItem, getConfigString } from '../utils/config.utils'

let client: Db

export default async function mongo() {
	if (!client) {
		const mongoUrl = await getConfigString(ConfigItem.MongoUrl)
		client = new MongoClient(mongoUrl).db('the-cocktail-collective')
	}

	return client
}

export enum Collection {
	Users = 'users',
	Recipes = 'recipes',
}
