require("dotenv").config();

import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

//menentukan berapa lama token dan penyegaran token berlaku default 100 =  1 menit dan default refresh token setiap 1200 = 20 menit
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXP || "100");
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXP || "1200"
);

//options for cookie
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000), //konversi ke milidetik dengan kaduluarsa 1 jam
  maxAge: accessTokenExpire * 60 * 60 * 1000, //maksimum usia cookie
  httpOnly: true, //cookie hanya dapat diakses melalui HTTP
  sameSite: "lax", //(aturan pengiriman cookie)
};

export const refreshokenOptions: ITokenOptions = {
   //24 pertama ke jam ,60 pertama menit, 60 kedua detik dan 1000 ke milidetik
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};


export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  // menghasilkan token akses dan token penyegaran 
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //Ini dapat digunakan untuk menyimpan data sesion  pengguna.
  redis.set(user._id, JSON.stringify(user) as any);

  //Jika aplikasi berjalan dalam mode produksi, maka opsi secure pada accessTokenOptions 
  //diatur ke true, yang menandakan bahwa cookie hanya akan dikirim melalui koneksi yang aman (HTTPS).
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions); //token cookie akses berlakku selam 5 jam
  res.cookie("refresh_token", refreshToken, refreshokenOptions); //token cookie berlaku 3 hari setelah di buat

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });

  
};
