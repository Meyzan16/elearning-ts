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
