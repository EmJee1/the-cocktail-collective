import { faker } from '@faker-js/faker'
import type { ObjectId } from 'mongodb'
import readline from 'node:readline/promises'
import type { User } from 'models/user'
import type { Recipe } from 'models/recipe'
import { Technique } from 'models/recipe'
import { hashString } from '../utils/encrypt.utils'
import mongo, { Collection } from '../repositories/database'
import { uniqueSlug } from '../utils/slug.utils'

process.env.NODE_ENV = 'development'
const USERS_TO_GENERATE = 10 as const

const users: User[] = []
const recipes: Recipe[] = []

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

;(async function () {
	console.log('This script will delete all existing database contents')
	const continueAnswer = await rl.question('Do you want to continue? [y/n]')
	if (continueAnswer.toUpperCase() !== 'Y') {
		console.log('Script exited')
		process.exit(0)
	}

	const allCollections = await (await mongo()).collections()
	await Promise.all(
		allCollections.map(c => {
			console.log(`Dropping collection ${c.collectionName}`)
			c.drop()
		})
	)

	for (let i = 0; i < USERS_TO_GENERATE; i++) {
		users.push(await generateUser())
	}

	console.log(`Inserting ${users.length} users`)
	const { insertedIds: insertedUserIds } = await (await mongo())
		.collection<User>(Collection.Users)
		.insertMany(users)
	const userIds = Object.values(insertedUserIds)

	for (const userId of userIds) {
		for (let i = 0; i < faker.datatype.number({ min: 0, max: 6 }); i++) {
			recipes.push(generateRecipe(userId))
		}
	}

	console.log(`Inserting ${recipes.length} recipes`)
	await (await mongo())
		.collection<Recipe>(Collection.Recipes)
		.insertMany(recipes)
	console.log('Seeding finished')
	process.exit(0)
})()

async function generateUser(): Promise<User> {
	const sex = faker.name.sexType()
	const password = await hashString('password')

	return {
		firstName: faker.name.firstName(sex),
		lastName: faker.name.lastName(sex),
		email: faker.internet.email(),
		favorites: [],
		password,
	}
}

function generateRecipe(author: ObjectId): Recipe {
	const cocktailName = generateCocktailName()
	const slug = uniqueSlug(cocktailName)

	return {
		_id: slug,
		name: cocktailName,
		image: {
			url: faker.image.food(250, 250),
			alt: `the ${cocktailName} cocktail`,
		},
		technique: faker.helpers.arrayElement([
			Technique.Stirred,
			Technique.Shaken,
		]),
		description: faker.lorem.paragraphs(3),
		ingredients: [],
		steps: Array()
			.fill(faker.datatype.number({ min: 2, max: 6 }))
			.map(() => faker.lorem.words(faker.datatype.number({ min: 3, max: 14 }))),
		author,
	}
}

function generateCocktailName() {
	const cocktails = [
		'Old Fashioned',
		'Negroni',
		'Daiquiri',
		'Dry Martini',
		'Margarita',
		'Espresso Martini',
		'Whiskey Sour',
		'Manhattan',
		'Aperol Spritz',
		'Mojito',
		'Bloody Mary',
	] as const

	return cocktails[Math.floor(Math.random() * cocktails.length)]
}
