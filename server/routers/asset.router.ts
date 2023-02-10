import path from 'node:path'
import createRouter from '../utils/router.utils'
import {
	badRequest,
	created,
	internalServerError,
} from '../utils/response.utils'
import parseImage from '../middleware/parse-image.middleware'
import authenticated from '../middleware/authenticated.middleware'
import { getBucket } from '../utils/storage.utils'
import { generateId } from '../utils/uuid.utils'

const { router, POST } = createRouter()

POST(
	'/',
	{},
	async (req, res) => {
		if (!req.file) {
			return badRequest(res, 'Een afbeelding is verplicht')
		}

		const filename = `${generateId()}${path.extname(req.file.originalname)}`
		const bucket = await getBucket()
		const file = bucket.file(filename)
		const stream = file.createWriteStream()

		stream.on('error', err => {
			// TODO: move to a production-ready logger
			console.error(err.message)
			return internalServerError(res)
		})

		stream.on('finish', () => {
			return created(res, {
				imageUrl: file.publicUrl(),
			})
		})

		stream.end(req.file.buffer)
	},
	authenticated,
	parseImage('image')
)

export default router
