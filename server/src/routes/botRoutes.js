import { Router } from "express";
import BotController from "../controllers/botController.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = Router();

router.get("/", authMiddleware, BotController.getAll);
router.post("/", authMiddleware, BotController.create);
router.put("/:id", BotController.update);
router.delete("/:id", BotController.delete);

export default router;
