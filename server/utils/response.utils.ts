import { Response } from 'express'

export function ok(res: Response, body: Record<string, unknown>) {
	return res.status(200).json(body)
}

export function created(res: Response, body: Record<string, unknown>) {
	return res.status(201).json(body)
}

export function noContent(res: Response) {
	return res.sendStatus(204)
}

const clientErrorStatusCodes = [400, 401, 404, 409] as const
export const [badRequest, unauthorized, notFound, conflict] =
	clientErrorStatusCodes.map(statusCode => {
		return function (res: Response, error: string) {
			return res.status(statusCode).json({
				error,
			})
		}
	})
