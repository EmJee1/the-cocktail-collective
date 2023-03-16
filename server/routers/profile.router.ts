import createRouter from '../utils/router.utils'
import authenticated from '../middleware/authenticated.middleware'
import { getUser } from '../repositories/user.repository'
import { ok } from '../utils/response.utils'
import { getRequestUserId } from '../utils/request-properties.utils'

const { GET, router } = createRouter()

GET(
	'/',
	{},
	async (req, res) => {
		const user = await getUser(getRequestUserId(req))
		return ok(res, { user })
	},
	authenticated
)

export default router
