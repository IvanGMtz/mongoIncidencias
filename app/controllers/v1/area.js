import {con} from "../../../config/connection/atlas.js";
import {siguienteId} from "../../helpers/counter.js";

let db = await con();
let collection = db.collection("areas");

export const getAreasV1 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().toArray();
    res.send(result);
}


export const addAreaV1 = async (req, res) => {
    if (!req.rateLimit) return;

    const requiredFields = [
      { field: "NOMBRE", message: "Area NOMBRE not provided" },
      { field: "TIPO", message: "Area TIPO not provided" },
      { field: "COMPUTADORES", message: "Area COMPUTADORES not provided" },
      { field: "TECLADOS", message: "Area TECLADOS not provided" },
      { field: "MOUSE", message: "Area MOUSE not provided" },
      { field: "DIADEMAS", message: "Area DIADEMAS not provided" }
    ];
  
    for (const { field, message } of requiredFields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({ message });
      }
    }

    const {
      NOMBRE, TIPO, COMPUTADORES, TECLADOS,MOUSE, DIADEMAS
    } = req.body;

    const newAreaId = await siguienteId("areas");
    const newArea = {
      id: newAreaId,
      nombre: NOMBRE,
      tipo: TIPO,
      computadores: COMPUTADORES,
      teclados: TECLADOS,
      mouse: MOUSE,
      diademas: DIADEMAS
    };

    try {
      const result = await collection.insertOne(newArea);
      res.status(201).json({ message: "Area added successfully", insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding area", error: error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description});
    }
};