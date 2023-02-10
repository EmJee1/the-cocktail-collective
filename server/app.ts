import express from 'express'
import authRouter from './routers/auth.router'
import recipeRouter from './routers/recipe.router'
import assetRouter from './routers/asset.router'

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)
app.use('/asset', assetRouter)

const PORT = 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
