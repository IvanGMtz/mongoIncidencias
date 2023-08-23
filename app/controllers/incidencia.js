import {con} from "../../config/connection/atlas.js";
import {siguienteId} from "../helpers/counter.js";

let db = await con();
let collection = db.collection("incidencias");

export const getIncidencias = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().toArray();
    res.send(result);
}


export const addIncidencia = async (req, res) => {
    if (!req.rateLimit) return;

    const requiredFields = [
      { field: "CATEGORIA", message: "Incidencia CATEGORIA not provided" },
      { field: "TIPO", message: "Incidencia TIPO not provided" },
      { field: "DESCRIPCION", message: "Incidencia DESCRIPCION not provided" },
      { field: "SEVERIDAD", message: "Incidencia SEVERIDAD not provided" },
      { field: "IDA", message: "Incidencia IDA not provided" },
      { field: "IDT", message: "Incidencia IDT not provided" }
    ];
  
    for (const { field, message } of requiredFields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({ message });
      }
    }
  
    const {
      CATEGORIA, TIPO, DESCRIPCION, IDA, IDT,SEVERIDAD,
      FECHA_REPORTE= new Date(Date.now())
    } = req.body;

    const newIncidenciaId = await siguienteId("incidencias");
    const newIncidencia = {
      id: newIncidenciaId,
      categoria: CATEGORIA,
      tipo: TIPO,
      descripcion: DESCRIPCION,
      fecha_reporte: new Date(FECHA_REPORTE),
      severidad: SEVERIDAD,
      area: IDA,
      trainer: IDT
    };
      
    try {
      const result = await collection.insertOne(newIncidencia);
      res.status(201).json({ message: "Incidencia added successfully", insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding incidencia", error: error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description});
    }
  };