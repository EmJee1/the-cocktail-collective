import { ObjectId } from 'mongodb'
import { Image } from './common'

export interface Recipe {
	/**
	 * Primary key also acts as url-friendly slug
	 * This is always unique, for constraints on the _id field check the mongodb documentation:
	 * https://www.mongodb.com/docs/manual/core/document/#the-id-field
	 */
	_id: string
	name: string
	image: Image
	technique: Technique
	description?: string
	ingredients: Ingredient[]
	steps: string[]
	author: ObjectId
}

export interface Ingredient {
	name: string
	volume: Volume
}

export interface Volume {
	unit: VolumeUnit
	value: number
}

export const enum VolumeUnit {
	Milliliter = 'ml',
}

export const enum Technique {
	Shaken = 'shaken',
	Stirred = 'stirred',
}

/**
 * DbRecipe is equal to Recipe but exported for consistency with other models
 */
export type DbRecipe = Recipe
