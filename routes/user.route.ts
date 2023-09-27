import express from "express";

import { registrationUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/register', registrationUser);

export default userRouter;