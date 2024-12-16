import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = Router();

router.get("/", TaskController.getAll);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
