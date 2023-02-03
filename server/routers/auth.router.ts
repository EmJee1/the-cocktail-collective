import { z } from 'zod'
import createRouter from '../utils/router.utils'
import { compareHash, hashString } from '../utils/encrypt.utils'
import { getUserByEmail, insertUser } from '../repositories/user.repository'
import { signJwt } from '../utils/jsonwebtoken.utils'

const { POST, router } = createRouter()

POST(
	'/login',
	z.object({
		email: z.string().email(),
		password: z.string(),
	}),
	async (req, res) => {
		const user = await getUserByEmail(req.body.email)
		if (!user) {
			return res.status(404).json({
				ok: false,
				errors: ['That email address is not registered, please register'],
			})
		}

		const pwdIsValid = compareHash(req.body.password, user.password)
		if (!pwdIsValid) {
			return res.status(401).json({
				ok: false,
				errors: ['The entered password for that account is incorrect'],
			})
		}

		const token = await signJwt(user)

		return res.status(200).json({
			ok: true,
			token,
		})
	}
)

POST(
	'/register',
	z.object({
		email: z.string().email(),
		password: z.string().min(6),
	}),
	async (req, res) => {
		const user = await getUserByEmail(req.body.email)
		if (user) {
			return res.status(409).json({
				ok: false,
				errors: [
					'You are already registered with that email address, please log in',
				],
			})
		}

		const passwordHash = await hashString(req.body.password)
		const result = await insertUser({
			email: req.body.email,
			password: passwordHash,
		})

		return res.status(201).json({
			ok: true,
			id: result.insertedId,
		})
	}
)

export default router
