import express from "express";
import {limitGet} from "../middlewares/limit.js";
import {getTrainersV1} from "../controllers/v1/trainer.js"
import {getTrainersV2, addTrainerV2, deleteTrainerV2} from "../controllers/v2/trainer.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";
const version = routesVersioning();
const appTrainer = express.Router();

appTrainer.use(limitGet(), validarToken);

appTrainer.get("/", version({
    "^1.0.0": getTrainersV1,
    "~2.2.1": getTrainersV2
}));

appTrainer.post("/", version({
    "~2.2.1": addTrainerV2
}));

appTrainer.delete("/:id", version({
    "~2.2.1": deleteTrainerV2
}));

export default appTrainer;