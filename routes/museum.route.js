import { Router } from "express";
import { getMuseums, createMuseums } from "../controllers/museum.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { validatorMuseumAdd } from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/museum       get all museum
// GET    /api/v1/museum/:id   get one museum
// POST   /api/v1/museum       create museum
// PATCH  /api/v1/museum/:id   update museum
// DELETE /api/v1/museum/:id   delete museum

router.get("/", requireToken, getMuseums);
router.post("/", requireToken, validatorMuseumAdd, createMuseums);
export default router;
