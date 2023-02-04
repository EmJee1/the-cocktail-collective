import { z } from 'zod'
import createRouter from '../utils/router.utils'
import type { Recipe } from '../models/Recipe'
import { noContent } from '../utils/response.utils'
import { insertRecipe } from '../repositories/recipe.repository'

const { router, POST } = createRouter()

POST(
	'/',
	z.object({
		name: z.string().min(2),
		steps: z.array(z.string()),
	}),
	async (req, res) => {
		const recipeRecord: Recipe = {
			name: req.body.name,
			steps: req.body.steps,
			ingredients: [],
			author: req.userId,
		}

		await insertRecipe(recipeRecord)

		return noContent(res)
	}
)

export default router
