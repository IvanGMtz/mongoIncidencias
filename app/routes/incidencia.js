import express from "express";
import {limitGet} from "../middlewares/limit.js";
import {getIncidencias, addIncidencia} from "../controllers/incidencia.js"
import { verifyToken } from '../middlewares/JWT.js';

const appIncidencia = express.Router();

appIncidencia.get("/", verifyToken, limitGet(), getIncidencias);
appIncidencia.post("/", verifyToken, limitGet(), addIncidencia);

export default appIncidencia;