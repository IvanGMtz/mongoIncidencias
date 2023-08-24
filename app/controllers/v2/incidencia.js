import {con} from "../../../config/connection/atlas.js";

let db = await con();
let collection = db.collection("incidencias");

export const getIncidenciasV2 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().sort({fecha_reporte:1}).toArray();
    res.send(result);
}

export const deleteIncidenciaV2 = async (req, res) => {
    if (!req.rateLimit) return;
    const IncidenciaIdToDelete = Number(req.body.id);
    if (!IncidenciaIdToDelete) {
      res.status(400).json({ message: "Incidencia ID not provided" });
      return;
    }
    try {
      const result = await collection.deleteOne({ id: IncidenciaIdToDelete });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Incidencia deleted successfully" });
      } else {
        res.status(404).json({ message: "Incidencia not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting incidencia", error: error.message });
    }
}