import express from "express";
import {limitGet} from "../middlewares/limit.js";
import passportHelper from '../helpers/passport.js';
import {getTrainersV1} from "../controllers/v1/trainer.js"
import {getTrainersV2, addTrainerV2, deleteTrainerV2} from "../controllers/v2/trainer.js"
import routesVersioning  from 'express-routes-versioning';
const version = routesVersioning();
const appTrainer = express.Router();

appTrainer.use(limitGet(), passportHelper.authenticate('bearer', { session: false }));

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