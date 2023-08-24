import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("trainers");

export const getTrainersV1 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().toArray();
    res.send(result);
}
