import repo from "../repositories/index.js"
import { parsePagination } from "../utils/pagination.js"

export async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, q, sort } = req.query
    const { offset, limit: lim } = parsePagination({ page, limit })
    const result = await repo.list({ q, offset, limit: lim, sort })
    res.json({
      page: Number(page) || 1,
      limit: lim,
      total: result.total,
      data: result.data
    })
  } catch (err) {
    next(err)
  }
}

export async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10)
    const row = await repo.getById(id)
    if (!row) return res.status(404).json({ error: "Livro não encontrado" })
    res.json(row)
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  try {
    const { titulo, autor, editora } = req.body
    const created = await repo.create({ titulo, autor, editora })
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10)
    const { titulo, autor, editora } = req.body
    const payload = { titulo, autor, editora }
    const updated = await repo.update(id, payload)
    if (!updated) return res.status(404).json({ error: "Livro não encontrado" })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10)
    const ok = await repo.remove(id)
    if (!ok) return res.status(404).json({ error: "Livro não encontrado" })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

