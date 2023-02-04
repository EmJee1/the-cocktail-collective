import { NextFunction, Request, Response } from 'express'
import { SafeParseError, Schema } from 'zod'

export interface ValidateSchemas<B, P> {
	body?: Schema<B>
	params?: Schema<P>
}

export default function validateRequest<B, P>(schemas: ValidateSchemas<B, P>) {
	return function (req: Request, res: Response, next: NextFunction) {
		const parseResults = (
			Object.entries(schemas) as [keyof ValidateSchemas<B, P>, Schema][]
		).map(([key, schema]) => {
			return schema.safeParse(req[key])
		})

		const [failedResult] = parseResults.filter(
			result => !result.success
		) as SafeParseError<unknown>[]
		if (failedResult) {
			return res.status(400).json({
				ok: false,
				errors: failedResult.error.errors,
			})
		}

		next()
	}
}
