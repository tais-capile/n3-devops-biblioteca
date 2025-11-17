import { body, param, query } from "express-validator"

export const createLivroRules = [
  body("titulo").isString().trim().notEmpty().withMessage("titulo é obrigatório"),
  body("autor").isString().trim().notEmpty().withMessage("autor é obrigatório"),
  body("editora").isString().trim().notEmpty().withMessage("editora é obrigatória"),
]

export const updateLivroRules = [
  param("id").isInt({ min: 1 }).withMessage("id inválido"),
  body("titulo").optional().isString().trim().notEmpty(),
  body("autor").optional().isString().trim().notEmpty(),
  body("editora").optional().isString().trim().notEmpty(),
]

export const idParamRules = [
  param("id").isInt({ min: 1 }).withMessage("id inválido")
]

export const listQueryRules = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("q").optional().isString().trim(),
  query("sort").optional().isString().isIn([
    "titulo","autor","editora",
    "-titulo","-autor","-editora"
  ])
]
