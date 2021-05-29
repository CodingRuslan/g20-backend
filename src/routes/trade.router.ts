import express from "express";
import { TradeController } from "../controllers"
import { Request, Response } from 'express';

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  const controller = new TradeController();
  const response = await controller.getTrades();
  return res.send(response);
});


export default router;
