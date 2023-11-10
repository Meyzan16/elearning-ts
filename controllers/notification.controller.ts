import NotificationModel from "../models/notification.model";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

// get all notification only admin
export const getNotifications = CatchAsyncError(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update notification by adminn
export const updateNotification = CatchAsyncError(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const idNotif = req.params.id;
      const notification = await NotificationModel.findById(idNotif);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 400));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification.save();
      // Dalam kasus ini, data akan diurutkan berdasarkan properti createdAt dalam urutan menurun (-1).
      // Artinya, data akan diurutkan mulai dari yang paling baru (tanggal yang lebih besar) ke yang paling lama.
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      //    opsional chaining (?) memungkinkan Anda untuk mengakses properti dari objek yang mungkin null atau
      // undefined tanpa menghasilkan kesalahan, sementara tanpa opsional chaining akan menghasilkan kesalahan
      // jika objek tersebut null atau undefined
      res.status(201).json({
        succcess: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
