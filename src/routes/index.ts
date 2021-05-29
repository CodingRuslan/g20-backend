import express from "express";
import { PingController } from "../controllers";
import CountryRouter from "./country.router";
import BuildRouter from "./build.router"
import LinkRouter from "./link.routes"
import OptionsRouter from "./options.router"
import ResourcesRouter from "./resources.router"
import TradeRouter from "./trade.router"

const router = express.Router();

router.get("/ping", async (req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/countries", CountryRouter);
router.use("/builds", BuildRouter)
router.use("/options", OptionsRouter)
router.use("/links", LinkRouter)
router.use("/resources", ResourcesRouter)
router.use("/trades", TradeRouter)

export default router;
