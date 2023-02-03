import { z } from 'zod'
import createRouter from '../utils/router.utils'
import { hashString } from '../utils/encrypt.utils'
import { insertUser } from '../repositories/user.repository'

const { POST, router } = createRouter()

POST(
	'/register',
	z.object({
		email: z.string().email(),
		password: z.string().min(6),
	}),
	async (req, res) => {
		const passwordHash = await hashString(req.body.password)

		const result = await insertUser({
			email: req.body.email,
			password: passwordHash,
		})

		return res.status(200).json({
			ok: true,
			id: result.insertedId,
		})
	}
)

export default router
