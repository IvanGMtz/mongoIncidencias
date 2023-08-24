import express from "express";
import {limitGet} from "../middlewares/limit.js";
import passportHelper from '../helpers/passport.js';
import {getIncidenciasV1, addIncidenciaV1} from "../controllers/v1/incidencia.js"
import {getIncidenciasV2, deleteIncidenciaV2} from "../controllers/v2/incidencia.js"
import routesVersioning  from 'express-routes-versioning';
const version = routesVersioning();

const appIncidencia = express.Router();
appIncidencia.use(limitGet(), passportHelper.authenticate('bearer', { session: false }));

appIncidencia.get("/", version({
    "^1.0.0": getIncidenciasV1,
    "~2.2.1": getIncidenciasV2
})); 

appIncidencia.post("/", version({
    "^1.0.0": addIncidenciaV1
}));

appIncidencia.delete("/:id", version({
    "~2.2.1": deleteIncidenciaV2
}));

export default appIncidencia;