import { Db, MongoClient } from 'mongodb'
import { ConfigItem, getConfigString } from '../utils/config.utils'

let client: Db

export default async function mongo() {
	if (!client) {
		const mongoUrl = await getConfigString(ConfigItem.MongoUrl)
		client = new MongoClient(mongoUrl).db('discord')
	}

	return client
}
