import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

import {
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  createOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, updateOrderToDelivered);

router.route("/:id").get(protect, getOrderById);

export default router;
