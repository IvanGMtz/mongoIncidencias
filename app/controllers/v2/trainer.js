import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("trainers");

export const getTrainersV2 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().sort({nombre:1}).toArray();
    res.send(result);
}