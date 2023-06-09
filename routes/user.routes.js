import { Router } from "express";
import { getUserInfo } from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/", requireToken, getUserInfo);

export default router;
