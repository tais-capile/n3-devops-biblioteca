import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'
import livrosRoutes from './routes/livros.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api/livros', livrosRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
