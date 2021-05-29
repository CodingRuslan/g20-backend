import express from "express";
import { ResourceController } from '../controllers';
import { Request, Response } from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new ResourceController();
  const response = await controller.getResources();
  return res.send(response);
});

export default router;
