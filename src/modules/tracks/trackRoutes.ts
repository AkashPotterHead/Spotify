import express from "express";
import { tracksController } from "./trackController";

const tracksRouter = express.Router();

tracksRouter.get("/top", tracksController.getTracks);

export default tracksRouter;