let SEQ = 0
const table = []

function matchesSearch(item, q) {
  if (!q) return true
  const s = q.toLowerCase()
  return (
    item.titulo.toLowerCase().includes(s) ||
    item.autor.toLowerCase().includes(s) ||
    item.editora.toLowerCase().includes(s)
  )
}

function applySort(items, sort) {
  if (!sort) return items
  const desc = sort.startsWith("-")
  const field = desc ? sort.slice(1) : sort
  return [...items].sort((a, b) => {
    if (a[field] == null) return 1
    if (b[field] == null) return -1
    if (a[field] < b[field]) return desc ? 1 : -1
    if (a[field] > b[field]) return desc ? -1 : 1
    return 0
  })
}

export default {
  async list({ q, offset = 0, limit = 10, sort }) {
    const filtered = table.filter(it => matchesSearch(it, q))
    const sorted = applySort(filtered, sort)
    const total = sorted.length
    const data = sorted.slice(offset, offset + limit)
    return { data, total }
  },

  async getById(id) {
    return table.find(it => it.id === id) || null
  },

  async create({ titulo, autor, editora }) {
    const row = {
      id: ++SEQ,
      titulo,
      autor,
      editora,
      created_at: new Date().toISOString()
    }
    table.push(row)
    return row
  },

  async update(id, payload) {
    const idx = table.findIndex(it => it.id === id)
    if (idx === -1) return null
    table[idx] = { ...table[idx], ...payload }
    return table[idx]
  },

  async remove(id) {
    const idx = table.findIndex(it => it.id === id)
    if (idx === -1) return false
    table.splice(idx, 1)
    return true
  }
}

