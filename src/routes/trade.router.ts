import express from "express";
import { TradeController } from "../controllers"
import { Request, Response } from 'express';

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  const controller = new TradeController();
  const response = await controller.getTrades();
  return res.send(response);
});

router.get('/ads', async (req: Request, res: Response) => {
  const controller = new TradeController();
  const trades = await controller.getAllAds();
  return res.send(trades);
});

router.get('/closed-trades', async (req: Request, res: Response) => {
  const controller = new TradeController();
  const trades = await controller.getAllClosedTrades();
  return res.send(trades);
});

router.post('/delete', async (req: Request, res: Response) => {
  const controller = new TradeController();
  const trades = await controller.deleteTrade(req.body);
  return res.send(trades);
});

router.post('/create-trade', async (req: Request, res: Response) => {
  const controller = new TradeController();
  const trade = await controller.createTrade(req.body);
  return res.send(trade);
});


export default router;
