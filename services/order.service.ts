import { NextFunction, Response } from "express";
import OrderModel from "../models/order.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

//create coourse
export const newOrder = CatchAsyncError(
  async (data: any, res:Response, next:NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
      success:true,
      order,
  })
  }
);

//get all order
export const getAllOrderService = async (res:Response) => {
  const orders = await OrderModel.find().sort({createdAt: -1});
  res.status(201).json({
      success:true,
      orders,
  })
}
