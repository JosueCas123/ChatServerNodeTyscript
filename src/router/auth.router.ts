import { Router } from "express";
import crearUsuario from "../controllers/auth.controllers";



const authRouter  = Router();

authRouter.post('/new', crearUsuario)



export default authRouter ;