import jwt, { JwtPayload } from 'jsonwebtoken';

export const generarJWT = (uid:string) => {
    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as any,{
            expiresIn: '24h'
        },(err,token) =>{
        
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    })
}

export const comprobarJWT = (token:any = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string) as JwtPayload
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}