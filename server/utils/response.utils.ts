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

export function unauthorized(res: Response, error: string) {
	return res.status(401).json({
		error,
	})
}

export function notFound(res: Response, error: string) {
	return res.status(404).json({
		error,
	})
}

export function conflict(res: Response, error: string) {
	return res.status(409).json({
		error,
	})
}
