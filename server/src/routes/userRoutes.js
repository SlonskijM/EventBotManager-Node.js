import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/me", userController.getOne);
router.put("/update", userController.update);

export default router;
