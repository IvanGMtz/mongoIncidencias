import express from "express";
import {limitGet} from "../middlewares/limit.js";
import {getAreas, addArea} from "../controllers/area.js"
import { verifyToken } from '../middlewares/JWT.js';

const appArea = express.Router();

appArea.get("/", verifyToken, limitGet(), getAreas);
appArea.post("/", verifyToken, limitGet(), addArea);

export default appArea;