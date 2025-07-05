import express from "express";
import { getOrdersHandler, getSummaryHandler, createOrderHandler } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/api/orders", getOrdersHandler);
router.get("/api/summary", getSummaryHandler);
router.post("/api/orders", createOrderHandler);

export default router;
