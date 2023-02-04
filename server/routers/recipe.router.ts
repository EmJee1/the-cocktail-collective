import { z } from 'zod'
import createRouter from '../utils/router.utils'
import type { Recipe } from '../models/Recipe'
import { noContent, notFound, ok } from '../utils/response.utils'
import {
	getRecipe,
	getRecipes,
	insertRecipe,
} from '../repositories/recipe.repository'
import authenticated from '../middleware/authenticated.middleware'
import { ObjectId } from 'mongodb'

const { router, GET, POST } = createRouter()

GET('/', {}, async (_, res) => {
	const recipes = await getRecipes()
	return ok(res, {
		recipes,
	})
})

GET(
	'/:id',
	{
		params: z.object({
			id: z.string(),
		}),
	},
	async (req, res) => {
		const recipeId = new ObjectId(req.params.id)
		const recipe = await getRecipe(recipeId)
		if (!recipe) {
			return notFound(res, 'That recipe does not exist')
		}

		return ok(res, {
			recipe,
		})
	}
)

POST(
	'/',
	{
		body: z.object({
			name: z.string().min(2),
			steps: z.array(z.string()),
		}),
	},
	async (req, res) => {
		const recipeRecord: Recipe = {
			name: req.body.name,
			steps: req.body.steps,
			ingredients: [],
			author: req.userId,
		}

		await insertRecipe(recipeRecord)

		return noContent(res)
	},
	authenticated
)

export default router
