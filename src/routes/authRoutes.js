import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validateBody } from "../middleware/validation.js";
import { insertUserSchema } from "../db/schema.js";
import { z } from "zod";
const router = Router();

const validateLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
router.post("/register", validateBody(insertUserSchema), register);

router.post("/login", validateBody(validateLogin), login);

export default router;
