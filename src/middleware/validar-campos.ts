import { validationResult } from 'express-validator';

export const validarCampos = (req:Request, res:any, next:any) => {
    const valitation = validationResult(req)

    if(!valitation.isEmpty()){
        return res.status(400).json({
            ok:false,
            errores: valitation.mapped()
        })
    }
    next();
}