import cors from 'cors'
import express from 'express'
import authRouter from './routers/auth.router'
import recipeRouter from './routers/recipe.router'
import assetRouter from './routers/asset.router'
import logger from './utils/logging.utils'
import { Environment, isEnvironment } from './utils/environment.utils'

const app = express()

const corsOriginUrl = isEnvironment(Environment.Development)
	? 'http://localhost:3000'
	: 'PROD_URL'

app.use(cors({ origin: corsOriginUrl }))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)
app.use('/asset', assetRouter)

const PORT = 8080
app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
