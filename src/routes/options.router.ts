import express from "express";
import { OptionController } from "../controllers"
import { Request, Response } from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new OptionController();
  const response = await controller.getOptions();
  return res.send(response);
});

router.get('/is-game-going', async (req: Request, res: Response) => {
  const controller = new OptionController();
  const status = await controller.isGameGoing();
  return res.send((status as any).value);
});

router.post('/set-game-status', async (req: Request, res: Response) => {
  const controller = new OptionController();
  const status = await controller.changeStatusOfGame();
  return res.send(status);
});


export default router;
