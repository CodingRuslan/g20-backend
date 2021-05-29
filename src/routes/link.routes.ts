import express from "express";
import { LinkController } from "../controllers"
const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new LinkController();
  const response = await controller.getLinks();
  return res.send(response);
});

export default router;
