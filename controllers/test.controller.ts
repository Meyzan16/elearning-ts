///membaut test staging area controller test
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

export const testController = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    res.status(201).json({
        success: true,
        message: `Test doang !`,
      });
});