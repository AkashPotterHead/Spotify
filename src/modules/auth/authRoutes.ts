import express from "express";
import { login, callback } from "./authController";

const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.get("/callback", callback);

export default authRouter;