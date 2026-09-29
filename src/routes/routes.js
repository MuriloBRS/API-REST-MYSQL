import { Router } from "express";
import controller from "../controllers/controller.js";

const router = Router();

router.post("/", controller.Cadastrar);

router.get("/", controller.Listar);

router.put("/:id", controller.Atualizar);

router.delete("/:id", controller.Deletar);

export default router;
