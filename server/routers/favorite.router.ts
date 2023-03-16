import { z } from 'zod'
import logger from '../utils/logging.utils'
import createRouter from '../utils/router.utils'
import { noContent, notFound } from '../utils/response.utils'
import authenticated from '../middleware/authenticated.middleware'
import { updateUser } from '../repositories/user.repository'
import { getRecipe } from '../repositories/recipe.repository'
import { getRequestUserId } from '../utils/request-properties.utils'

const { POST, DELETE, router } = createRouter()

POST(
	'/',
	{
		body: z.object({
			recipe: z.string(),
		}),
	},
	async (req, res) => {
		const recipe = await getRecipe(req.body.recipe)
		if (!recipe) {
			logger.info(
				`Failed to add to favorites because ${req.body.recipe} does not exist`
			)
			return notFound(res, 'That recipe does not exist')
		}

		await updateUser(getRequestUserId(req), {
			$addToSet: { favorites: recipe._id },
		})
		return noContent(res)
	},
	authenticated
)

DELETE(
	'/',
	{ body: z.object({ recipe: z.string() }) },
	async (req, res) => {
		await updateUser(getRequestUserId(req), {
			$pull: { favorites: req.body.recipe },
		})
		return noContent(res)
	},
	authenticated
)

export default router
