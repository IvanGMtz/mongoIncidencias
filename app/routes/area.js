import express from "express";
import {limitGet} from "../middlewares/limit.js";
import passportHelper from '../helpers/passport.js';
import {getAreasV1, addAreaV1} from "../controllers/v1/area.js"
import routesVersioning  from 'express-routes-versioning';

const version = routesVersioning();
const appArea = express.Router();
appArea.use(limitGet(), passportHelper.authenticate('bearer', { session: false }));

appArea.get("/", version({
    "^1.0.0": getAreasV1
})); 
appArea.post("/", version({
    "^1.0.0": addAreaV1
}));

export default appArea;