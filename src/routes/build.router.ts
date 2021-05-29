import express from "express";
import { BuildController } from "../controllers"
import { Request, Response } from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new BuildController();
  const response = await controller.getBuilds();
  return res.send(response);
});

router.post("/create-build", async (req, res) => {
  const controller = new BuildController();
  const response = await controller.createBuild(req.body);
  return res.send(response);
});

// router.post('/create-build', async (req: Request, res: Response) => {
//   const newBuild = await resourceController.createNewBuild(req.body);
//   return res.status(OK).send(newBuild);
// });

export default router;
