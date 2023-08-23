import {con} from "../../config/connection/atlas.js";
import { SignJWT, jwtVerify } from "jose"
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const conexionDB = await con();
const crearToken = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) return res.status(400).send({message: "Datos no enviados"});
    const result = await conexionDB.collection('usuario').findOne(req.body);
    console.log(result);
    if (!result) return res.status(401).send({message: "Usuario no encontrado"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_SECRET));
    req.data = {status: 200, message: jwtConstructor};
    res.send(jwtConstructor)
    next(); 
}
const validarToken = async (req, token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        let res = await conexionDB.collection('usuario').findOne(
            {
                _id:new ObjectId(jwtData.payload.id),
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        );
        let {_id, permisos, ...usuario} = res;
        return usuario;
    } catch (error) {
        return false;
    }
}
export {
    crearToken,
    validarToken
}