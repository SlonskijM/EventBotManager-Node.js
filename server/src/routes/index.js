import { Router } from "express";
import userRoutes from "./userRoutes.js";
import botRoutes from "./botRoutes.js";
import messageRoutes from "./messageRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/bot", botRoutes);
router.use("/bot/:botId", messageRoutes);
router.use("/task", taskRoutes);

export default router;
