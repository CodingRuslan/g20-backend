import express from "express";
import { LinkController } from "../controllers"
import { Request, Response } from 'express';

const router = express.Router();

router.get("/header-links", async (req, res) => {
  const controller = new LinkController();
  const response = await controller.getLinks();
  return res.send(response);
});

export default router;
