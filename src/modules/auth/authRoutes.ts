import express from "express";
import { login, callback, revoke } from "./authController";

const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.get("/callback", callback);
authRouter.delete("/revoke", revoke);

export default authRouter;