import { Router } from "express"
import { list, getById, create, update, remove } from "../controllers/livros.controller.js"
import { validate } from "../middleware/validate.js"
import {
  createLivroRules,
  updateLivroRules,
  idParamRules,
  listQueryRules
} from "../models/livro.rules.js"

const router = Router()

router.get("/", listQueryRules, validate, list)
router.get("/:id", idParamRules, validate, getById)
router.post("/", createLivroRules, validate, create)
router.put("/:id", updateLivroRules, validate, update)
router.delete("/:id", idParamRules, validate, remove)

export default router

