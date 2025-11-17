import pkg from "pg"
const { Pool } = pkg

const pool = new Pool() // lê dados do .env automaticamente

export default {
  async list({ q, offset = 0, limit = 10, sort }) {
    const sorts = {
      "titulo": "titulo",
      "-titulo": "titulo DESC",
      "autor": "autor",
      "-autor": "autor DESC",
      "editora": "editora",
      "-editora": "editora DESC"
    }

    const orderBy = sorts[sort] || "id"

    const params = []
    let where = ""

    if (q) {
      params.push(`%${q}%`, `%${q}%`, `%${q}%`)
      where = `WHERE titulo ILIKE $1 OR autor ILIKE $2 OR editora ILIKE $3`
    }

    params.push(limit, offset)

    const listSql = `
      SELECT id, titulo, autor, editora
      FROM livros
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${params.length-1} OFFSET $${params.length};
    `

    const countSql = `SELECT COUNT(*)::int AS total FROM livros ${where};`

    const [listRes, countRes] = await Promise.all([
      pool.query(listSql, params),
      pool.query(countSql, q ? params.slice(0, -2) : [])
    ])

    return { data: listRes.rows, total: countRes.rows[0].total }
  },

  async getById(id) {
    const r = await pool.query(
      "SELECT id, titulo, autor, editora FROM livros WHERE id = $1",
      [id]
    )
    return r.rows[0] || null
  },

  async create({ titulo, autor, editora }) {
    const r = await pool.query(
      "INSERT INTO livros (titulo, autor, editora) VALUES ($1,$2,$3) RETURNING id, titulo, autor, editora",
      [titulo, autor, editora]
    )
    return r.rows[0]
  },

  async update(id, payload) {
    const current = await this.getById(id)
    if (!current) return null

    const novo = {
      titulo: payload.titulo ?? current.titulo,
      autor: payload.autor ?? current.autor,
      editora: payload.editora ?? current.editora
    }

    const r = await pool.query(
      "UPDATE livros SET titulo=$1, autor=$2, editora=$3 WHERE id=$4 RETURNING id, titulo, autor, editora",
      [novo.titulo, novo.autor, novo.editora, id]
    )
    return r.rows[0]
  },

  async remove(id) {
    const r = await pool.query("DELETE FROM livros WHERE id=$1", [id])
    return r.rowCount > 0
  }
}

