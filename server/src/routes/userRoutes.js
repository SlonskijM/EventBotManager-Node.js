import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/me", userController.getOne);
router.put("/update", userController.update);

export default router;
