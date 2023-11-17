
import { Request, Response, NextFunction } from 'express';
import { UserService } from "../service/user.service";
import UserModel from '../database/models/usuario';
import { generarJWT } from '../helpers/jwt';
import bcrypt from 'bcrypt';



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
        const token = await generarJWT(user.id)
       // retornamos la respuesta
        return res.status(200).json({
            ok:true,
            user,
            token
        })

        
    } catch (error) {
       return res.status(400).json({
            ok:false,
            msg:`error ${error}`
        })
            
        }
}


const login = async(req:Request, res:Response) => {

    const {email, password} = req.body
    try {
        
        const usuarioDB = await UserModel.findOne({email})
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'El correo no existe'
            })
        
        }

        //validamos la contrase;a 
        const validPassword = bcrypt.compareSync(password,usuarioDB.password)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'La contraseña no es valida'
            })
        }

        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            usuasio:usuarioDB,
            token

        })

       
    } catch (error) {
        
    }
    
}


const renewToken = async(req: any, res:Response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await UserModel.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    })

      
}


export {crearUsuario, login, renewToken}