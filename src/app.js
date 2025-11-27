import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'
import livrosRoutes from './routes/livros.routes.js'
import { pool } from './db.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({
      ok: true,
      agora: result.rows[0].now
    })
  } catch (error) {
    console.error('Erro ao testar conexão com o banco:', error)
    res.status(500).json({ ok: false, error: 'Erro ao conectar no banco' })
  }
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API biblioteca atualizada teste 1',
    uptime: process.uptime()
  })
})

app.use('/api/livros', livrosRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
