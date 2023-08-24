import {con} from "../../../config/connection/atlas.js";
import {siguienteId} from "../../helpers/counter.js";

let db = await con();
let collection = db.collection("trainers");

export const getTrainersV2 = async (req, res)=>{
    if (!req.rateLimit) return;
    let result = await collection.find().sort({nombre:1}).toArray();
    res.send(result);
}

export const addTrainerV2 = async (req, res) => {
    if (!req.rateLimit) return;

    const requiredFields = [
      { field: "NOMBRE", message: "Trainer NOMBRE not provided" },
      { field: "EMAIL_PERSONAL", message: "Trainer EMAIL_PERSONAL not provided" },
      { field: "EMAIL_CORPORATIVO", message: "Trainer EMAIL_CORPORATIVO not provided" },
      { field: "TELEFONO_MOVIL", message: "Trainer TELEFONO_MOVIL not provided" },
      { field: "TELEFONO_EMPRESA", message: "Trainer TELEFONO_EMPRESA not provided" }
    ];
  
    for (const { field, message } of requiredFields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({ message });
      }
    }
  
    const {
      NOMBRE, EMAIL_PERSONAL, EMAIL_CORPORATIVO, TELEFONO_MOVIL,TELEFONO_EMPRESA,
      TELEFONO_RESIDENCIAL="+0",
      TELEFONO_MOVIL_EMPRESARIAL="+0"
    } = req.body;

    const newTrainerId = await siguienteId("trainers");
    const newTrainer = {
      id: newTrainerId,
      nombre: NOMBRE,
      email_personal: EMAIL_PERSONAL,
      email_corporativo: EMAIL_CORPORATIVO,
      telefono_movil: TELEFONO_MOVIL,
      telefono_empresa: TELEFONO_EMPRESA,
      telefono_residencia: TELEFONO_RESIDENCIAL,
      telefono_movil_empresarial: TELEFONO_MOVIL_EMPRESARIAL
    };
      
    try {
      const result = await collection.insertOne(newTrainer);
      res.status(201).json({ message: "Trainer added successfully", insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding trainer", error: error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description});
    }
};

export const deleteTrainerV2 = async (req, res) => {
    if (!req.rateLimit) return;
    const trainerIdToDelete = Number(req.params.id);
    if (!trainerIdToDelete) {
      res.status(400).json({ message: "Trainer ID not provided" });
      return;
    }
    try {
      const result = await collection.deleteOne({ id: trainerIdToDelete });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Trainer deleted successfully" });
      } else {
        res.status(404).json({ message: "Trainer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting trainer", error: error.message });
    }
}