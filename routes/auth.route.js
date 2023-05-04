import { Router } from "express";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import {
  validationBodyRegister,
  validationBodyLogin,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", validationBodyRegister, register);
router.post("/login", validationBodyLogin, login);

router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
