import { ObjectId, WithId } from 'mongodb'
import { Image } from './common'

export interface Recipe {
	name: string
	image: Image
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

export enum VolumeUnit {
	Milliliter = 'ml',
}

export type DbRecipe = WithId<Recipe>
