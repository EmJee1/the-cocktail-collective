import multer from 'multer'
import { megabytesToBytes } from '../utils/convert.utils'

const multerParse = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: megabytesToBytes(1),
	},
})

export function parseImage(fieldName: string) {
	return multerParse.single(fieldName)
}
