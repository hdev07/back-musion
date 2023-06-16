import { Router } from "express";
import { createOpinion } from "../controllers/opinion.controller.js";
import { validatorBodyOpinion } from "../middlewares/validatorManager.js";

const router = Router();

// GET    /api/v1/opinions       get opinions with pagination/search/category
// GET    /api/v1/opinions/all   get all opinions
// GET    /api/v1/opinions/:id   get one opinion
// POST   /api/v1/opinions       create opinion
// PATCH  /api/v1/opinions/:id   update opinion
// DELETE /api/v1/opinions/:id   delete opinion

router.post("/", validatorBodyOpinion, createOpinion);

export default router;
