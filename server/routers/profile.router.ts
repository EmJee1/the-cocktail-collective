import createRouter from '../utils/router.utils'
import authenticated from '../middleware/authenticated.middleware'
import { ok } from '../utils/response.utils'
import { getRequestUser } from '../utils/request-properties.utils'

const { GET, router } = createRouter()

GET(
	'/',
	{},
	async (req, res) => {
		const user = await getRequestUser(req)
		return ok(res, { user })
	},
	authenticated
)

export default router
