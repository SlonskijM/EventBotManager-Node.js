import { Router } from "express";
import BotController from "../controllers/botController.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = Router();

router.get("/", authMiddleware, BotController.getAll);
router.post("/", authMiddleware, BotController.create);
router.get("/:botId", authMiddleware, BotController.getOne);
router.put("/:botId", authMiddleware, BotController.update);
router.delete("/:botId", authMiddleware, BotController.delete);

export default router;
