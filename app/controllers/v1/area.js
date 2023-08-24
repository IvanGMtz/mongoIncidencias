import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("areas");

export const getAreasV1 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().toArray();
    res.send(result);
}
