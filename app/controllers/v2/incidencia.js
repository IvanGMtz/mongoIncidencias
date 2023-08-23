import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("incidencias");

export const getIncidenciasV2 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().sort({fecha_reporte:1}).toArray();
    res.send(result);
}
