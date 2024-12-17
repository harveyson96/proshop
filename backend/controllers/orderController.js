import { response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc fetch all orders
//@route  GET /api/orders
//@access private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}); //find all
  res.status(200).json(orders);
});
//@desc create a new order
//@route  POST /api/orders
//@access private/admin
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    itemPrice,
    shippingPrice,
    totalPrice,
  } = req.body; //find all

  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No new Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item) => ({
        _id: undefined,
        ...item,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      itemPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
//@desc fetch my orders
//@route  GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.status(200).json(orders);
});
//@desc fetch single order
//@route  GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc update order to paid
//@route  PUT /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//@desc update order to delivered
//@route  PUT /api/orders/:id/delivered
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("delivered orders");
});
export {
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  createOrder,
};
