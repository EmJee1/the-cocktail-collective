import { NextFunction, Request, Response, Router } from 'express'
import validateRequest, {
	ValidateSchemas,
} from '../middleware/validate-request.middleware'

const httpVerbs = ['get', 'post', 'put', 'delete', 'patch', 'options'] as const

type EndpointUrl = `/${string}`
type HandlerWithValidatedRequest<Body, Params> = (
	req: Request<Params, any, Body>,
	res: Response
) => undefined | Response | Promise<Response | undefined>
type MiddlewareHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void | Response> | void

export default function createRouter() {
	const router = Router()

	const [GET, POST, PUT, DELETE, PATCH, OPTIONS] = httpVerbs.map(verb => {
		return <Body, Params>(
			url: EndpointUrl,
			schema: ValidateSchemas<Body, Params>,
			handler: HandlerWithValidatedRequest<Body, Params>,
			...middleware: MiddlewareHandler[]
		) => {
			router[verb](
				url,
				validateRequest(schema),
				...middleware,
				async (req, res, next) => {
					// Catch asynchronous errors in the handler and pass them to the errorHandler middleware
					try {
						// @ts-ignore
						return await handler(req, res)
					} catch (err) {
						next(err)
					}
				}
			)
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
