import { ObjectId, WithId } from 'mongodb'
import { Image } from './common'

export interface Recipe {
	slug: string
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

export type DbRecipe = WithId<Recipe>
