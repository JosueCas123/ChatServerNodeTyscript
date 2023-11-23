import express, { Router } from 'express';
import { validarJWT } from '../middleware/validar-jwr';
import { obtenerChat } from '../controllers/mensaje.contollers';


export const routerMesagge = express.Router()

routerMesagge.get('/:de', validarJWT, obtenerChat)