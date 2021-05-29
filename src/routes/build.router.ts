import express from "express";
import { BuildController } from "../controllers"
const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new BuildController();
  const response = await controller.getBuilds();
  return res.send(response);
});

export default router;
