import express from "express";
import { PingController } from "../controllers";
import CountryRouter from "./country.router";
import BuildRouter from "./build.router"


const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/countries", CountryRouter);
router.use("/builds", BuildRouter)

export default router;
