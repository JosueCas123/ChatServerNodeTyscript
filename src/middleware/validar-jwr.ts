import jwt from 'jsonwebtoken';
 
export const validarJWT = (req:any, res:any, next:any) => {
    try {

        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            })
        }
       
        const payload:any = jwt.verify(token, process.env.SECRETORPRIVATEKEY as any);

        req.uid = payload.uid;
        next()
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}
