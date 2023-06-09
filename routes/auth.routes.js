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
import {
  requestResetPassword,
  resetPassword,
} from "../controllers/resetPassword.controller.js";
import {
  sendConfirmationEmail,
  confirmEmailToken,
} from "../controllers/confirmEmail.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { checkEmailVerified } from "../middlewares/checkEmailVerify.js";
const router = Router();

router.post("/register", validationBodyRegister, register);
router.post("/login", validationBodyLogin, login);

router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

router.post("/reset-password/request", requestResetPassword);
router.post("/reset-password", resetPassword);

router.post(
  "/confirm-email",
  requireToken,
  checkEmailVerified,
  sendConfirmationEmail
);
router.get("/confirm-email/:token", confirmEmailToken);

export default router;
