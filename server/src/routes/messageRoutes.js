import { Router } from "express";
import MessageController from "../controllers/messageController.js";

const router = Router();

router.get("/", MessageController.getAll);
router.post("/", MessageController.create);
router.get("/:id", MessageController.getOne);
router.put("/:id", MessageController.update);
router.delete("/:id", MessageController.delete);

export default router;
