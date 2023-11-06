
import { Request, Response } from 'express';
import { UserService } from "../service/user.service";
import UserModel from '../database/models/usuario';



const service = new UserService();

const crearUsuario = async (req:Request, res:Response ) => {

    try {
        const body = req.body
        const {email} = body
        // verificamos que el correo no exista
        const existe = await UserModel.findOne({email})
        // condicion que verifica si exixte
        if(existe){
            return res.status(400).json({
                ok:false,
                msg:`El correo ${email} ya existe`
            }) 
        
        }
        // si no existe pasamos la data al service
        const user = await service.createAddUser(body)
       // retornamos la respuesta
        return res.status(200).json({
            ok:true,
            user
        })
    } catch (error) {
       return res.status(400).json({
            ok:false,
            msg:`error ${error}`
        })
            
        }
}

export default crearUsuario;