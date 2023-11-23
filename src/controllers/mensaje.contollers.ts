import { Request, Response } from "express"
import MensajeModel from "../database/models/mensajes";


const obtenerChat = async (req:any, res:Response) => {

    const miUid = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await MensajeModel.find({
        $or: [
            {de: miUid, para: mensajesDe},
            {de: mensajesDe, para: miUid}
        ]
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    res.json({
        ok:true,
        mensajes: last30
    })
}

export {
    obtenerChat}