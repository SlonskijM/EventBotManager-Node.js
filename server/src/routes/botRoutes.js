import { Router } from "express";

const router = Router();

router.get("/bots");
router.post("/bots");
router.put("/bots/:botId");
router.delete("/bots/:botId");

export default router;
