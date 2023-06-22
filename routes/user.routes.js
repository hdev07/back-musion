import { Router } from "express";
import { changePassword, getUserInfo } from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { validatorBodyChangePassword } from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requireToken, getUserInfo);
router.put(
  "/change-password",
  requireToken,
  validatorBodyChangePassword,
  changePassword
);

export default router;
