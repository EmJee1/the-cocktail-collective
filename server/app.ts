import express from 'express'
import authRouter from './routers/auth.router'

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const PORT = 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
