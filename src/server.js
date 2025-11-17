import dotenv from 'dotenv'
dotenv.config() // carrega variáveis do arquivo .env (a gente vai criar depois)

import app from './app.js' // importa o app que configuramos no outro arquivo

const PORT = process.env.PORT || 3000 // usa a porta do .env ou a 3000 por padrão

// inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 API de Biblioteca rodando em http://localhost:${PORT}`)
})