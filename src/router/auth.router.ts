import { Router } from "express";
import { crearUsuario, login, renewToken } from "../controllers/auth.controllers";
import { check } from 'express-validator';
import { validarCampos } from "../middleware/validar-campos";
import { validarJWT } from "../middleware/validar-jwr";




const authRouter  = Router();

authRouter.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], crearUsuario)

authRouter.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
],login)

authRouter.get('/renew', validarJWT,renewToken)




export default authRouter ;