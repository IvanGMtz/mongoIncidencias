import express from "express";
import {limitGet} from "../middlewares/limit.js";
import {getAreasV1} from "../controllers/v1/area.js"
import {addAreaV2} from "../controllers/v2/area.js"
import routesVersioning  from 'express-routes-versioning';
import {validarToken} from "../middlewares/JWT.js";

const version = routesVersioning();
const appArea = express.Router();
appArea.use(limitGet(), validarToken);

appArea.get("/", version({
    "^1.0.0": getAreasV1
})); 
appArea.post("/", version({
    "~2.2.1":addAreaV2
}));

export default appArea;