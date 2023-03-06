import { z } from 'zod'
import { type Recipe, Technique } from 'models/recipe'
import createRouter from '../utils/router.utils'
import { noContent, notFound, ok } from '../utils/response.utils'
import {
	getRecipe,
	getRecipes,
	insertRecipe,
} from '../repositories/recipe.repository'
import authenticated from '../middleware/authenticated.middleware'
import { STORAGE_BUCKET_URL } from '../utils/storage.utils'
import { uniqueSlug } from '../utils/slug.utils'

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
		const recipe = await getRecipe(req.params.id)
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
			image: z.object({
				url: z.string().startsWith(STORAGE_BUCKET_URL),
				alt: z.string().optional(),
			}),
			description: z.string().optional(),
			technique: z.enum([Technique.Shaken, Technique.Stirred]),
		}),
	},
	async (req, res) => {
		const recipeRecord: Recipe = {
			_id: uniqueSlug(req.body.name),
			name: req.body.name,
			steps: req.body.steps,
			image: {
				url: req.body.image.url,
				alt: req.body.image.alt || `${req.body.name} cocktail`,
			},
			ingredients: [],
			author: req.userId,
			description: req.body.description,
			technique: req.body.technique,
		}

		await insertRecipe(recipeRecord)

		return noContent(res)
	},
	authenticated
)

export default router
