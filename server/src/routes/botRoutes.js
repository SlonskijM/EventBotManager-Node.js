import { Router } from "express";
import BotController from "../controllers/botController.js";

const router = Router();

router.get("/", BotController.getAll);
router.post("/", BotController.create);
router.put("/:id", BotController.update);
router.delete("/:id", BotController.delete);

export default router;
