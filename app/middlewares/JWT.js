import dotenv from "dotenv";
import {con} from "../../config/connection/atlas.js";
import { SignJWT, jwtVerify } from "jose"
import { ObjectId } from "mongodb";
import {Router} from "express";
dotenv.config();

const crearToken = Router();
const verifyToken = Router();

const db = await con();
const rol = await db.collection('roles');

crearToken.get('/:colleccion', async (req, res) => {
    const { colleccion } = req.params;
    let result = undefined;

    try {
        result = await rol.aggregate([{ $match: { name: colleccion } }, { $project: { _id: 1 } }]).toArray()

        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(result[0]);
        const jwt = await jwtconstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("30m")
            .sign(encoder.encode(process.env.JWT_PASSWORD));
        res.send(jwt)
    } catch (error) {
        res.status(404).send({ status: 404, message: "Collection not found" })
    }   
});

verifyToken.use('/', async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send({ status: 400, token: "Token not sent" });
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PASSWORD)
        );
        req.data = jwtData;
        const checkAccess = await rol.aggregate([{ $match: { _id: new ObjectId(req.data.payload._id) } }, { $project: { access: 1 } }]).toArray()
        const access = checkAccess[0].access
        // Validacion del rol permitido en la base de datos con el router al que se desea acceder
        if(!access.includes(req.baseUrl)) return res.status(401).json({status:401,message:"You do not have permission to access"});
        console.log(checkAccess[0].access);
        //if (access.includes())
        next();
    } catch (error) {
        res.status(498).json({ status: 498, message: error.message })//"Token has expired or is invalid"
    }
});
export { crearToken, verifyToken }