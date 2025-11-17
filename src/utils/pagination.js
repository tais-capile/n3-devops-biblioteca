export function parsePagination({ page = 1, limit = 10 }) {
  const p = parseInt(page, 10) || 1
  const l = parseInt(limit, 10) || 10
  const offset = (p - 1) * l
  return { page: p, limit: l, offset }
}
