import { NextFunction, Request, Response } from 'express'
import { Schema } from 'zod'

export default function <T>(body: Schema<T>) {
	return function (req: Request, res: Response, next: NextFunction) {
		const parseResult = body.safeParse(req.body)

		if (!parseResult.success) {
			return res.status(400).json({
				ok: false,
				errors: parseResult.error.errors,
			})
		}

		next()
	}
}
