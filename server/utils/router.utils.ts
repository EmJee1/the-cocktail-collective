import { Request, Response, Router } from 'express'
import { Schema } from 'zod'
import validateBodyMiddleware from '../middleware/validate-body.middleware'

const httpVerbs = ['get', 'post', 'put', 'delete', 'patch', 'options'] as const

type HandlerWithValidatedBody<T> = (
	req: Request<any, any, T>,
	res: Response
) => Response | Promise<Response>

export default function createRouter() {
	const router = Router()

	const [GET, POST, PUT, DELETE, PATCH, OPTIONS] = httpVerbs.map(verb => {
		return <T>(
			url: string,
			schema: Schema<T>,
			handler: HandlerWithValidatedBody<T>
		) => {
			router[verb](url, validateBodyMiddleware(schema), handler)
		}
	})

	return {
		router,
		GET,
		POST,
		PUT,
		DELETE,
		PATCH,
		OPTIONS,
	}
}
