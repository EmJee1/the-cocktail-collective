import mongo, { Collection } from './database'
import type { Recipe } from '../models/Recipe'
import type { ObjectId } from 'mongodb'

async function recipeCollection() {
	return (await mongo()).collection<Recipe>(Collection.Recipes)
}

export async function insertRecipe(recipe: Recipe) {
	return (await recipeCollection()).insertOne(recipe)
}

export async function getRecipe(recipeId: ObjectId) {
	return (await recipeCollection()).findOne({ _id: recipeId })
}

export async function getRecipes() {
	return (await recipeCollection()).find().toArray()
}
