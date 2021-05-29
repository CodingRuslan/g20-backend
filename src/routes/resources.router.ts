import express from "express";
import { ResourceController } from '../controllers';
import { Request, Response } from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new ResourceController();
  const response = await controller.getResources();
  return res.send(response);
});

router.get('/add-resources', async (req: Request, res: Response) => {
  const controller = new ResourceController();
  await controller.addResources();
  return res.send();
});

export default router;
