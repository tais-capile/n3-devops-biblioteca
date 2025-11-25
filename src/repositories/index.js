import dotenv from "dotenv"
dotenv.config() // garante que o .env foi carregado

const repoType = (process.env.REPOSITORY || "memory").toLowerCase()

let repo

if (repoType === "sql") {
  const mod = await import("./livros.sql.js") // futuro: Postgres
  repo = mod.default
} else {
  const mod = await import("./livros.memory.js")
  repo = mod.default
}

export default repo

