import { z } from 'zod'
import createRouter from '../utils/router.utils'
import { compareHash, hashString } from '../utils/encrypt.utils'
import { getUserByEmail, insertUser } from '../repositories/user.repository'
import { signJwt } from '../utils/jsonwebtoken.utils'
import {
	conflict,
	created,
	notFound,
	ok,
	unauthorized,
} from '../utils/response.utils'

const { POST, router } = createRouter()

POST(
	'/login',
	{
		body: z.object({
			email: z.string().email(),
			password: z.string(),
		}),
	},
	async (req, res) => {
		const user = await getUserByEmail(req.body.email)
		if (!user) {
			return notFound(res, 'There is no account registered with that email')
		}

		const pwdIsValid = await compareHash(req.body.password, user.password)
		if (!pwdIsValid) {
			return unauthorized(res, 'The entered password is incorrect')
		}

		const token = await signJwt({ _id: user._id })

		return ok(res, {
			token,
		})
	}
)

POST(
	'/register',
	{
		body: z.object({
			email: z.string().email(),
			password: z.string().min(6),
		}),
	},
	async (req, res) => {
		const user = await getUserByEmail(req.body.email)
		if (user) {
			return conflict(res, 'You are already registered with that email address')
		}

		const passwordHash = await hashString(req.body.password)
		const result = await insertUser({
			email: req.body.email,
			password: passwordHash,
		})

		return created(res, {
			id: result.insertedId,
		})
	}
)

export default router
