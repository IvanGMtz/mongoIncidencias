import express from "express";
import {limitGet} from "../middlewares/limit.js";
import {getTrainers, addTrainer} from "../controllers/trainer.js"
import { verifyToken } from '../middlewares/JWT.js';

const appTrainer = express.Router();

appTrainer.get("/", verifyToken, limitGet(), getTrainers);
appTrainer.post("/", verifyToken, limitGet(), addTrainer);

export default appTrainer;